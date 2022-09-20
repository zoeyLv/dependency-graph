<template>
  <body>
    <div>
      <el-tree :data="data" ></el-tree>
    </div>
  </body>
</template>
<script>
import { defineComponent } from 'vue'
import { ElTree } from 'element-plus'
import rootTree from './data.js'

const defaultProps = {
  children: 'children',
  label: 'label'
}

export default defineComponent({
  components: {
    ElTree
  },
  setup() {
    return {
      data: rootTree,
    }
  }
})

</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
