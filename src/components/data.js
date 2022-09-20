// const data = {
//     "vue": {
//         "version": "3.2.39",
//         "dependencies": {
//             "@vue/shared": "3.2.39",
//             "@vue/compiler-dom": "3.2.39",
//             "@vue/runtime-dom": "3.2.39",
//             "@vue/compiler-sfc": "3.2.39",
//             "@vue/server-renderer": "3.2.39"
//         }
//     },

//     "@vue/compiler-sfc@3.2.39": {
//         "version": "3.2.39",
//         "dependencies": {
//             "@babel/parser": "^7.16.4",
//             "@vue/compiler-core": "3.2.39",
//             "@vue/compiler-dom": "3.2.39",
//             "@vue/compiler-ssr": "3.2.39",
//             "@vue/reactivity-transform": "3.2.39",
//             "@vue/shared": "3.2.39",
//             "estree-walker": "^2.0.2",
//             "magic-string": "^0.25.7",
//             "source-map": "^0.6.1",
//             "postcss": "^8.1.10"
//         }
//     },

//     "@vue/shared@3.2.3": {
//         "version": "3.2.39"
//     },

//     "@vue/compiler-dom@3.2.39": {
//         "version": "3.2.39",
//         "dependencies": {
//             "@vue/shared": "3.2.39",
//             "@vue/compiler-core": "3.2.39"
//         }
//     },

//     "@vue/server-renderer@3.2.39": {
//         "version": "3.2.39",
//         "dependencies": {
//             "@vue/shared": "3.2.39",
//             "@vue/compiler-ssr": "3.2.39"
//         }
//     },

//     "source-map@^0.6.1": {
//         "version": "0.6.1"
//     },

//     "@vue/runtime-dom@3.2.39": {
//         "version": "3.2.39",
//         "dependencies": {
//             "@vue/shared": "3.2.39",
//             "@vue/runtime-core": "3.2.39",
//             "csstype": "^2.6.8"
//         }
//     },

//     "@vue/reactivity-transform@3.2.39": {
//         "version": "3.2.39",
//         "dependencies": {
//             "@babel/parser": "^7.16.4",
//             "@vue/compiler-core": "3.2.39",
//             "@vue/shared": "3.2.39",
//             "estree-walker": "^2.0.2",
//             "magic-string": "^0.25.7"
//         }
//     },

//     "estree-walker@^2.0.2": {
//         "version": "2.0.2"
//     },

//     "@vue/compiler-core@3.2.39": {
//         "version": "3.2.39",
//         "dependencies": {
//             "@vue/shared": "3.2.39",
//             "@babel/parser": "^7.16.4",
//             "estree-walker": "^2.0.2",
//             "source-map": "^0.6.1"
//         }
//     },

//     "magic-string@^0.25.7": {
//         "version": "0.25.9",
//         "dependencies": {
//             "sourcemap-codec": "^1.4.8"
//         }
//     },

//     "postcss@^8.1.10": {
//         "version": "8.4.16",
//         "dependencies": {
//             "nanoid": "^3.3.4",
//             "picocolors": "^1.0.0",
//             "source-map-js": "^1.0.2"
//         }
//     },

//     "@babel/parser@^7.16.4": {
//         "version": "7.19.1"
//     },

//     "@vue/compiler-ssr@3.2.39": {
//         "version": "3.2.39",
//         "dependencies": {
//             "@vue/shared": "3.2.39",
//             "@vue/compiler-dom": "3.2.39"
//         }
//     },

//     "csstype@^2.6.8": {
//         "version": "2.6.21"
//     },

//     "sourcemap-codec@^1.4.8": {
//         "version": "1.4.8",
//         "dependencies": {}
//     },

//     "nanoid@^3.3.4": {
//         "version": "3.3.4"
//     },

//     "picocolors@^1.0.0": {
//         "version": "1.0.0"
//     },

//     "source-map-js@^1.0.2": {
//         "version": "1.0.2"
//     },

//     "@vue/runtime-core@3.2.39": {
//         "version": "3.2.39",
//         "dependencies": {
//             "@vue/shared": "3.2.39",
//             "@vue/reactivity": "3.2.39"
//         }
//     },

//     "@vue/reactivity@3.2.39": {
//         "version": "3.2.39",
//         "dependencies": {
//             "@vue/shared": "3.2.39"
//         }
//     }
// }


// above is example data 

let dataByObj = JSON.parse(SON.stringify(data))


function getChildren(obje) {
    let result = []
    for (let item in obje) {
        result.push({ "label": item + '@' + obje[item]})
    }
    return result
}

// 建立root
let root = {}
for (let item in dataByObj) {
    root["label"] = item
    // console.log(dataByObj[item].dependencies)
    root["children"] = getChildren(dataByObj[item].dependencies)
    // console.log(root)
    break;
}

// 建立完整的树
for (let item in dataByObj) {
    if (item === root.label) {
        continue;
    }
    let existed_item = root.children.find(element => element.label === item)
    if (existed_item) {
        existed_item["children"] = getChildren(dataByObj[item].dependencies)
    } else {
        root.children.push({
            "label": item,
            "children": getChildren(dataByObj[item].dependencies)
        })
    }
}

// console.log(root)
// console.log(Object.keys(dataByObj))

const rootTree = new Array(root)

export default rootTree;