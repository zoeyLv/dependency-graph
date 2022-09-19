<template>
  <div class="axios-container page-container">
    <div class="page-title">Npm Package Info Page</div>
    <div class="user-info-container">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-input
              v-model="input1"
              placeholder="Please input"
              @change="getPackageInfo"
            >
              <template #prepend>Npm：</template>
            </el-input>

            <el-button class="button" type="text" @click="getPackageInfo"
              >点击获取npm包信息
            </el-button>
          </div>
        </template>
        <div class="info-list-box" v-loading="loading">
          <div class="text item">dependencies:</div>
          <ul>
            <li v-for="(value, key) in packageInfo" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
          <!-- <div class="text item" v-if="packageInfo?.name">
            name: {{ packageInfo?.name }}
          </div>
          <div class="text item" v-if="packageInfo?.version">
            version: {{ packageInfo?.version }}
          </div>
          <div class="text item" v-if="packageInfo?.dependencies">
            dependencies: {{ packageInfo?.dependencies }}
          </div> -->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
import axios from '../utils/axios'
import { downloadUnpkg, downloadHttp } from '../utils/download'

export default defineComponent({
  name: 'AxiosPage',
  setup() {
    const input1 = ref('')
    const packageInfo: Ref = ref(null)
    const loading = ref(false)

    // 存储下载的packages
    let packages = {};

    // 存储正在进行的requests
    let requests = new Set();
    
    const getPackageInfo = () => {

      packages = {};
      requests = new Set();

      loading.value = true
      console.log('user input', input1.value)
      run({ packageName: input1.value })
      // axios
      //   .get(input1.value + '/package.json')
      //   .then((response) => {
      //     console.log('response: ', response.data)
      //     packageInfo.value = response.data
      //     loading.value = false
      //   })
      //   .catch((error) => {
      //     loading.value = false
      //     console.error(error)
      //   })
    }

    const run = async (pkg) => {
      // 如果已经找到，或者正在查找，直接返回
      const key = generateKey(pkg)
      if (packages[key] || requests.has(key)) {
        return;
      }
      requests.add(key);
      // TODO: 确定是用 downloadHttp 还是 downloadUnpkg
      const type = extractType(pkg);
      if(type === 'https') {
        axios.get(downloadHttp(pkg.packageName, pkg.version))
          .then((response) => {
            if (response.data) {
              const packageJson = JSON.parse(atob(response.data.content));
              next(pkg, packageJson);
            }
          })
          .catch((error) => {
            loading.value = false
            packageInfo.value = null
            console.error(error)
          });
      } else if(type === 'semver') {
        axios.get(downloadUnpkg(pkg.packageName, pkg.version))
          .then((response) => {
            if (response.data) {
              const packageJson = response.data;
              next(pkg, packageJson);
            }
          })
          .catch((error) => {
              loading.value = false
              packageInfo.value = null
              console.error(error)
          });
      }
    }

    const extractType = pkg => {
      if(pkg.version?.match(/(^https|^git|^git\+https|^git\+ssh)\:\/\//)) {
        return 'https'
      } else {
        return 'semver'
      }
    }

    const next = (pkg, packageJson) => {
      const key = generateKey(pkg);
      requests.delete(key);
      packages[key] = formatData(packageJson);
      // 递归查找
      packageJson.dependencies &&
        Object.keys(packageJson.dependencies).map((dependency) => {
          run({ packageName: dependency, version: packageJson.dependencies[dependency] });
        });
      if (requests.size === 0) {
        loading.value = false
        packageInfo.value = packages
        console.log(packages)
      }
    }

    const formatData = (data) => {
      const { version, dependencies } = data;
      return { version, dependencies };
    }

    const generateKey = pkg => {
      return pkg.packageName + (pkg.version ? `@${pkg.version}` : '')
    }

    return {
      input1,
      packageInfo,
      loading,
      getPackageInfo,
    }
  },
})
</script>

<style scoped lang="scss">
.axios-container {
  .user-info-container {
    display: 'flex';
    justify-content: 'center';
    width: 100%;

    .info-list-box {
      padding: 10px;

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
