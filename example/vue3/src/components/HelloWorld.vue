<script setup lang="ts">
defineProps<{ msg: string }>();

const codeErr = () => {
  getTableData()
  let a = undefined;
  if (a.length) {
    console.log("1");
  }
};

const resourceError = () => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://abc.com/index.js';
  document.body.appendChild(script);
}

const getTableData = () => {
  setTimeout(() => {
    fetch(`http://localhost:8090/getErrorList`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        // this.tableData = res.data;
      });
  }, 500);
};

const promiseErr = () => {
  new Promise(resolve => {
    let person = {};
    person.name.age();
    resolve();
  });
}
</script>

<template>
  <el-button type="primary" @click="codeErr">js错误</el-button>
  <el-button type="danger" @click="promiseErr">promise错误</el-button>
  <!-- <el-button type="primary" @click="performance">performance</el-button> -->
  <!-- <el-button type="success" @click="asyncError">异步错误</el-button> -->
  <!-- <el-button type="danger" @click="promiseErr">promise错误</el-button>
  <el-button type="info" @click="xhrError">xhr请求报错</el-button>
  <el-button type="warning" @click="fetchError">fetch请求报错</el-button> -->
  <el-button type="danger" @click="resourceError">加载资源报错</el-button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
