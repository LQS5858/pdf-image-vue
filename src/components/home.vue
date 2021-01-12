<template>
  <div class="wrap">
    <div class="bg">
      <div>
        <div class="row">
          <p>移除PDF首尾间隔</p>
          <el-input v-model.trim="interval"
                    clearable
                    @input="interval=interval.replace(/[^\d.]/g,'')"></el-input>
        </div>
        <div class="row">
          <p>PDF转图片缩放比例</p>
          <el-input v-model.trim="scale"
                    clearable
                    @input="scale=scale.replace(/[^\d.]/g,'')"></el-input>
        </div>
      </div>
      <div v-loading="loading">
        <el-upload class="upload-demo"
                   action=""
                   :on-change="submitHandler"
                   :http-request="()=>{}"
                   accept="application/pdf"
                   ref="pdfUpload"
                   drag>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip"
               slot="tip">只能上传PDF文件</div>
        </el-upload>
      </div>
    </div>

    <div class="bg-img pdf-list">
    </div>
  </div>
</template>
<script>

import * as PDFJS from "pdfjs-dist";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default {
  name: "home",
  data () {
    return {
      canvasArr: [],
      loading: false,
      scale: 2,
      interval: 0,
      renderImgArr: []
    };
  },
  methods: {
    submitHandler (obj) {
      this.loading = true
      console.log('--refs--', obj.raw);
      const { raw } = obj || {}
      const fObj = new FileReader()
      fObj.readAsDataURL(raw)
      fObj.onloadend = e => {
        this.transformImage(e.target.result)
      }
    },
    async transformImage (value) {
      console.log('--base64>>', value);
      const loadingTask = PDFJS.getDocument(value);
      const pdfList = document.querySelector('.pdf-list')
      loadingTask.promise.then(async (pdf) => {
        // pdf 总页数
        let pages = pdf.numPages //声明一个pages变量等于当前pdf文件的页数
        for (let i = 1; i <= pages; i++) { //循环页数
          let canvas = document.createElement('canvas')
          let page = await pdf.getPage(i) //调用getPage方法传入当前循环的页数,返回一个page对象
          let scale = this.scale;//缩放倍数，1表示原始大小
          let viewport = page.getViewport({ scale });
          let context = canvas.getContext('2d'); //创建绘制canvas的对象
          canvas.height = viewport.height; //定义canvas高和宽
          canvas.width = viewport.width;
          let renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          await page.render(renderContext)
          canvas.className = `canvas` //给canvas节点定义一个class名,这里我取名为canvas
          pdfList.appendChild(canvas) //插入到pdfList节点的最后
          this.canvasArr.push(canvas)
        }
        this.addLisenter(pdfList)
        this.loading = false
      })
    },
    dataUrlToBold (url) {
      let arr = url.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bStr = atob(arr[1]),
        n = bStr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bStr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    addLisenter (dom) {
      dom.addEventListener('click', (e) => {
        console.log('---e--', e.target);
        const base64 = e.target.toDataURL('image/png')
        let blob = this.dataUrlToBold(base64);
        let obj_url = URL.createObjectURL(blob); // 消除Chrome下文件太大 导致下载失败（网络失败）的问题
        const aDom = document.createElement('a')
        aDom.href = obj_url
        aDom.download = 'bt'
        aDom.click()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;

  .bg {
    background: #fafafa;
    margin-top: 20px;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    display: flex;
    align-items: center;
    .row {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      p {
        flex: 2;
        font-size: 12px;
      }
      /deep/.el-input {
        flex: 2;
      }
    }
  }
  .bg-img {
    margin-top: 20px;
    /deep/ .canvas {
      cursor: pointer;
    }
  }
}
</style>