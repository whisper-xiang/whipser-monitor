<script setup lang="ts">
defineProps<{ msg: string }>();

const codeErr = () => {
  getTableData()
  let a = undefined;
  if (a.length) {
    console.log("1");
  }
};

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
</script>

<template>
  <el-button type="primary" @click="codeErr">js错误</el-button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
