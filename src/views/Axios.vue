<template>
  <div class="axios-container page-container">
    <div class="page-title">Axios Test Page</div>
    <div class="user-info-container">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">

            <el-input v-model="input1" placeholder="Please input" @change="getpackageinfo">
              <template #prepend>Npm：</template>
              <!-- <template #append>
                <el-button :icon="Search" />
              </template> -->
            </el-input>

            <el-button class="button" type="text" @click="getpackageinfo"
              >点击获取npm包信息
            </el-button>
          </div>
        </template>
        <div class="info-list-box" v-loading="loading">
          <div class="text item" v-if="packageinfo?.name">
            name: {{ packageinfo?.name }}
          </div>
          <div class="text item" v-if="packageinfo?.version">
            version: {{ packageinfo?.version }}
          </div>          
          <div class="text item" v-if="packageinfo?.dependencies">
            dependencies: {{ packageinfo?.dependencies }}
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import axios from "../utils/axios";
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'


export default defineComponent({
  name: "Axios",
  setup() {
    const input1 = ref('');    
    const packageinfo: Ref = ref(null);
    const loading = ref(false);

    const getpackageinfo = () => {
      loading.value = true;
      console.log("user input", input1.value);
      axios
        .get(input1.value+"/package.json")
        .then((response) => {
          console.log("response: ", response.data);
          packageinfo.value = response.data;
          loading.value = false;
        })
        .catch((error) => {
          loading.value = false;
          console.error(error);
        });
    };

    return {
      input1,
      packageinfo,
      loading,
      getpackageinfo,
    };
  },
});
</script>

<style scoped lang="stylus">

.axios-container {

  .user-info-container {
    display flex
    justify-content center
    width 100%

    .info-list-box {
      padding 10px

      .text {
        font-size: 14px;
      }

      .item {
        margin-bottom: 18px;
      }

    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .box-card {
      width: 480px;
    }

  }

}
</style>
