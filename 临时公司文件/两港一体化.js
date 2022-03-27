/**
 * @param {Stage} stage
 */
module.exports = (stage) => {

  let sty = document.createElement('style');
  sty.type = 'text/css';
  sty.innerHTML = `
  	::-webkit-scrollbar {
  		display: none;
  	}
  `
  document.head.appendChild(sty)


  stage.get('tab-list_dYo4t').on("handleClick", () => {
    console.log("这个组件有毒，初始化默认会执行一次1111111111111111111111111111")
  })


  let getCurrentDate = function (param) {
    let D = new Date();
    let _Y = D.getFullYear(),
      _M = D.getMonth(),
      _d = D.getDate();
    _M = _M + 1 < 10 ? "0" + (_M + 1) : _M + 1;
    _d = _d < 10 ? "0" + _d : _d;
    return `${_Y}${_M}${_d}`
  }
  /**
   * 2022-02-09
   * 
   */
  //  http://10.249.0.44/#/traffic-org?yyptId=yypt_uaa_3706bbee8761447c8be2cb40e5c43a5f

  // 变量/配置仓库
  let Store = {
    // 可能有多个公司提供接口
    ipConfig: {
      // 耗尽云计算的接口
      1: {
        develop: {
          ip: "http://10.249.2.36",   // ng转发
          port: ':8688',
          suffix: '/haojin-api-out'
        },
        production: {
          ip: "http://10.142.124.224",   // ng转发
          port: ':8688',
          suffix: '/haojin-api-in'
        },
      },
      // 应用测提供的接口
      2: {
        develop: {
          ip: "http://10.249.2.36", // ng转发
          port: ':8688',
          suffix: '/yingyongce-api-out'
          // suffix: ''
        },
        production: {
          ip: "http://10.142.124.224",   // ng转发
          port: ':8688',
          suffix: '/yingyongce-api-in'
        },
      }
    },
    // 外链的页面url
    iframeUrlConfig: {
      develop: "10.249.0.44:80",
      production: "10.142.124.238:9090"
    },
    // 静态资源地址
    staticIp: {
      develop: "10.249.2.36:7002",
      production: "10.142.124.224:7002"
    },
    env: "production",
    // app弹窗图片轮播
    App_ImgIndex: 0,
    // 业务申报弹窗图片轮播
    ywsb_ImgIndex: 0,


    "layerCache": [], // 图层缓存
    "curScreen": "",  // 当前场景


    timeDimension: { // 模块的时间维度
      "进出港模块": "date",
      "核心指标模块": "date",
      "交通效率指标模块": "date"
    },
    havenDimension: {  // 模块的港口维度（当前选中是哪个港口）
      "生产调度模块": "宁波",
      "引航/拖轮作业模块": "宁波"
    },
    times: {  // 定时器
      "日集装箱量": null
    },


    module_hxzb: {   // 核心指标模块变量
      "日集装箱量数值缓存": '',
      "月集装箱量数值缓存": '',
      "年集装箱量数值缓存": '',
    },
    module_jcgyit: {   // 进出港模块变量
      "enterOut": ''  // 进、出    航门的进、出状态记录
    },
    module_hddtqk: { // 航道动态情况模块变量
      havenList: ['虾峙门', '条帚门', '双屿门', '西堠门大桥', '金塘大桥'], // 所有的航门列表
      havenIdList: {   // 对应的id
        "条帚门": "6e06c1f2252e4e7690b483e008c6ae69",
        "金塘大桥": "7fca87915e0245d2af5a20252c14f569",
        "双屿门": "90c76c0dfeca4475b90a8d688a6c4b3c",
        "西堠门大桥": "1d65beab29604cf4b72446e0a918e91c",
        "虾峙门": "ddef337616c94e059981d65ac28e1a64"
      },
      "curPageFor今日通过量": 1,           // 一页显示两条
      "curPageFor航道船舶吨位分布": 1,     // 一页显示两条
      "curDialogTimeDimensionFor条帚门艘次": "date",  // 条帚门下弹窗的时间维度  年月日
      "curDialogTimeDimensionFor条帚门船舶流量": ""   // 条帚门下弹窗的时间维度	 month(近6月) year(近3年)
    },
    module_jcg: { // 进出港模块变量
      cache_ywsbapp: null // 当前展示的是业务申报还是app弹窗
    },
    module_jtlvzb: { // 交通效率指标模块变量
      "tabStausFor经济航速船舶指标对比": "",// 
      "curDialogTimeDimensionFor待泊时长": "date",  // 待泊时长弹窗的时间维度  年月日
      "curDialogTimeDimensionFor待泊船舶": "date",  // 待泊船舶数弹窗的时间维度  年月日
    }

  }

  // app轮播图片
  Store.App_ImgList = [
    `http://${Store.staticIp[Store.env]}/imgs/jtzzyth/APP1.jpg`,
    `http://${Store.staticIp[Store.env]}/imgs/jtzzyth/APP2.jpg`,
    `http://${Store.staticIp[Store.env]}/imgs/jtzzyth/APP3.jpg`
  ]
  // 业务申报轮播图片
  Store.ywsb_ImgList = [
    `http://${Store.staticIp[Store.env]}/imgs/jtzzyth/ywsb1.jpg`,
    `http://${Store.staticIp[Store.env]}/imgs/jtzzyth/ywsb2.jpg`,
    `http://${Store.staticIp[Store.env]}/imgs/jtzzyth/ywsb3.jpg`,
    `http://${Store.staticIp[Store.env]}/imgs/jtzzyth/ywsb4.jpg`
  ]
  // 静态资源、外链环境部署  (不要随意更换顺序)
  Store._static = [
    `http://${Store.staticIp[Store.env]}/imgs/top.apng`,
    `http://${Store.staticIp[Store.env]}/imgs/border.png`,
    `http://${Store.staticIp[Store.env]}/imgs/border1.png`,
    `http://${Store.iframeUrlConfig[Store.env]}/#/traffic-org?yyptId=yypt_uaa_3706bbee8761447c8be2cb40e5c43a5f&prediction=true`, // 航路预测外链url
  ]



  console.log("Store仓库", Store)

  /**
   * 核心类
   */
  class DataV {
    constructor(obj = {
      Store: undefined,
      ComList: undefined,
      ComEvent: undefined,
      ComApi: undefined,
      Script: () => { }
    }) {
      // super();
      this.renderTypeList = this.renderTypeList();
      this.Script = obj['Script'];    // 脚本
      this.Store = obj['Store'];      // 配置/全局变量
      this.ComApi = this.init_ComApi(obj['ComApi']); // 接口
      this.ComEvent = this.init_ComEvent(obj['ComEvent']); // 事件
      this.ComList = this.init_ComList(obj['ComList']); // 组件
      this.init_all(); // 初始化

      setTimeout(() => {
        try {
          this.Script.call(this)
        } catch (e) {
          console.error('script脚本有异常', e)
        }
      }, 1000)
    }
    /**
     * 注册api接口函数
     * @param {Object} baseObj	包含组件id,包含组件名字
     * @param {Object} options	配置
     */
    registerApi(baseObj, options) {
      if (!baseObj.id || !stage.get(baseObj.id)) {
        return console.error("组件获取失败,绑定接口失败！", baseObj.name);
      }
      if (!baseObj.type) {
        return console.error("请先设置组件类型！！！", baseObj.name);
      }
      let {
        apiName,
        times,
        params,
        filters,
        renderAfter,
        connectComList
      } = options;
      if (apiName != undefined) {
        // 数据过滤器存在
        let runInterface = () => {
          if (!this.ComApi[apiName]) return console.error(apiName, "未声明在ComApi中")
          this.ComApi[apiName].call(this, params).then(res => {
            // 过滤器是否存在且是一个函数
            let flag = filters && Object.prototype.toString.call(filters) ===
              '[object Function]';
            let flag_renderAfter = renderAfter && Object.prototype.toString.call(renderAfter) ===
              '[object Function]';

            // stage.get(baseObj.id).render(this.renderTypeList[baseObj.type](flag ? filters(res) : res));
            stage.get(baseObj.id).render(flag ? filters.call(this, res) : res);
            flag_renderAfter ? renderAfter.call(this) : ""
            // 关联组件列表需要是一个数组
            if (Object.prototype.toString.call(connectComList) == '[object Array]' &&
              connectComList.length > 0) {
              connectComList.forEach(name => {
                let connectComObj = this.ComList[name];
                if (!stage.get(connectComObj.id)) return console.error("绑定关联组件失败源:", baseObj.name, "关联组件:", name);
                flag = connectComObj.data.filters && Object.prototype.toString.call(connectComObj.data.filters) === '[object Function]';
                stage.get(connectComObj.id).render(flag ? connectComObj.data.filters.call(this, res) : res);

                flag_renderAfter = connectComObj.data.renderAfter && Object.prototype.toString.call(connectComObj.data.renderAfter) === '[object Function]';
                flag_renderAfter ? connectComObj.data.renderAfter.call(this) : ""
              })
            } else {
              // return console.error("关联组件列表必须是数组且要有值！！！", connectComList);
            }
          });
        }
        runInterface();
        // 接口轮询开启之后
        if (times != undefined) {
          times = Number(times)
          this.ComList[baseObj.name]['data']['timer'] = setInterval(() => {
            // console.warn("接口自动轮询的",baseObj)
            runInterface()
          }, times)
        }
      }
    }
    /**
     * 处理数据源的静态数据函数
     * @param {Object} baseObj	包含组件id,包含组件名字
     * @param {Object} options	配置
     */
    dataObject_staticData(baseObj, options) {
      if (!baseObj.id || !stage.get(baseObj.id)) {
        return console.error("组件获取失败,绑定接口失败！", baseObj.name);
      }
      if (!baseObj.type) {
        return console.error("请先设置组件类型！！！", baseObj.name);
      }
      let {
        data,
        filters,
        renderAfter
      } = options;
      if (data != undefined) {
        // 数据过滤器存在
        let flag = filters && Object.prototype.toString.call(filters) === '[object Function]';
        stage.get(baseObj.id).render(flag ? filters.call(this, data) : data)

        // 渲染后的函数调用
        let flag_renderAfter = renderAfter && Object.prototype.toString.call(renderAfter) === '[object Function]';
        flag_renderAfter ? renderAfter.call(this) : ""
      }
    }
    /**
     * render函数的组件类型配置返回函数
     */
    renderTypeList() {
      return {
        "翻牌器": (obj) => [obj],
        "通用标题": (value) => [{
          value
        }],
        "平面地图-面": (features) => {
          return {
            "type": "FeatureCollection",
            "name": "面数据" + Number(Math.random() * 100).toFixed(3).replace(".", ""),
            "crs": {
              "type": "name",
              "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
              }
            },
            "features": features
          }
        }
        // ...
      }
    }

    // 初始化所有
    init_all() {
      let self = this;
      let queue = [];  // 等待循环走完后再走队列中的代码

      for (let i in this.ComList) {
        let eventIsAObject = Object.getOwnPropertyNames(this.ComList[i]).findIndex(item => item ==
          'event') != -1 && Object.prototype.toString.call(this.ComList[i]['event']) === '[object Object]';
        let dataIsAObject = Object.getOwnPropertyNames(this.ComList[i]).findIndex(item => item ==
          'data') != -1 && Object.prototype.toString.call(this.ComList[i]['data']) === '[object Object]';
        let reloadApiIsAFunction = Object.getOwnPropertyNames(this.ComList[i]).findIndex(item => item ==
          'reloadApi') != -1 && Object.prototype.toString.call(this.ComList[i]['reloadApi']) === '[object Function]';
        let initCssIsAObject = Object.getOwnPropertyNames(this.ComList[i]).findIndex(item => item ==
          'initCss') != -1 && Object.prototype.toString.call(this.ComList[i]['initCss']) === '[object Object]';
        let firstChildrenInitCssIsAObject = Object.getOwnPropertyNames(this.ComList[i]).findIndex(item => item ==
          'firstChildrenInitCss') != -1 && Object.prototype.toString.call(this.ComList[i]['firstChildrenInitCss']) === '[object Object]';
        let toggleIsAObject = Object.getOwnPropertyNames(this.ComList[i]).findIndex(item => item ==
          'toggleOption') != -1 && Object.prototype.toString.call(this.ComList[i]['toggleOption']) === '[object Object]';

        // 注册事件
        if (eventIsAObject) {
          for (let eventObjectKey in this.ComList[i].event) {
            let eventObjectValue = this.ComList[i].event[eventObjectKey];
            try {
              if (eventObjectValue) {
                switch (eventObjectKey) {
                  case "originClickName":
                    stage.get(this.ComList[i].id).container[0].addEventListener("click", this
                      .ComEvent[eventObjectValue].bind(this))
                    break;
                  case "origin1ClickName":
                    stage.get(this.ComList[i].id).container.addEventListener("click", this
                      .ComEvent[eventObjectValue].bind(this))
                    break;
                  case "clickName":
                    stage.get(this.ComList[i].id).on("click", this.ComEvent[eventObjectValue].bind(
                      this));
                    break;
                  case "mouseoverName":
                    stage.get(this.ComList[i].id).on("mouseover", this.ComEvent[eventObjectValue].bind(
                      this));
                    break;
                  case "mouseoutName":
                    stage.get(this.ComList[i].id).on("mouseout", this.ComEvent[eventObjectValue].bind(
                      this));
                    break;
                  case "tabClickName":
                    stage.get(this.ComList[i].id).on("tabClick", this.ComEvent[eventObjectValue].bind(
                      this));
                    break;
                  case "zoomendName":
                    stage.get(this.ComList[i].id).viewer.map.on("zoomend", this.ComEvent[eventObjectValue].bind(
                      this));
                    break;
                  case "rowClickedName":
                    stage.get(this.ComList[i].id).on("row-clicked", this.ComEvent[eventObjectValue]
                      .bind(this));
                    break;
                  case "pickName":
                    stage.get(this.ComList[i].id).on("pick", this.ComEvent[eventObjectValue].bind(
                      this));
                    break;
                  case "leftClickName":
                    stage.get(this.ComList[i].id).on("leftClick", this.ComEvent[eventObjectValue].bind(
                      this));
                    break;
                  case "dotClickName":
                    stage.get(this.ComList[i].id).on("dot-Click", this.ComEvent[eventObjectValue].bind(
                      this));
                    break;
                  case "richTabClickName":
                    stage.get(this.ComList[i].id).on("richTabClick", this.ComEvent[eventObjectValue]
                      .bind(this));
                    break;
                  case "cellClickName":
                    stage.get(this.ComList[i].id).on("cellClick", this.ComEvent[eventObjectValue]
                      .bind(this));
                    break;
                  case "handleSelectName":
                    stage.get(this.ComList[i].id).on("handleSelect", this.ComEvent[eventObjectValue]
                      .bind(this));
                    break;
                  case "handleClickName":
                    stage.get(this.ComList[i].id).on("handleClick", this.ComEvent[eventObjectValue]
                      .bind(this));
                    break;
                }
              }
            } catch (e) {
              console.log(eventObjectKey, "注册事件失败", e, i, this.ComList[i])
            }
          }
        }

        // 注册数据
        if (dataIsAObject) {
          // 注册数据-接口-过滤器     接口统一延迟1秒调用
          // setTimeout(() => {
          for (let dataObjectKey in this.ComList[i].data) {
            let dataObjectValue = this.ComList[i].data[dataObjectKey];
            if (dataObjectValue) {
              switch (dataObjectKey) {
                case "api":
                  this.registerApi({
                    name: i,
                    id: this.ComList[i].id,
                    type: this.ComList[i].type,
                  }, {
                    apiName: dataObjectValue || undefined,
                    times: this.ComList[i].data['times'] || undefined,
                    params: this.ComList[i].data['params'] || undefined,
                    filters: this.ComList[i].data['filters'] || undefined,
                    renderAfter: this.ComList[i].data['renderAfter'] || undefined,
                    connectComList: this.ComList[i].data['connectComList'] ||
                      undefined,
                  });
                  break;
                case "staticData":
                  if (this.ComList[i].data['api']) {
                    return console.error('注意啊！api和静态数据不能同时存在')
                  }
                  this.dataObject_staticData({
                    name: i,
                    id: this.ComList[i].id,
                    type: this.ComList[i].type,
                  }, {
                    data: this.ComList[i].data['staticData'] || undefined
                  });
                  break;
              }
            }
          }
          this.ComList['isInitCompleteReloadApi'] = false // 是否初始化完成重载api接口
          // 重载api接口函数
          if (reloadApiIsAFunction) {
            let fn = this.ComList[i]['reloadApi'];
            this.ComList[i]['reloadApi'] = (apiName = this.ComList[i].data.api, params = this.ComList[i].data.params, callback = () => { }) => {
              // 默认初始化的时候会执行一次
              if (!this.ComList['isInitCompleteReloadApi']) {
                this.ComList['isInitCompleteReloadApi'] = true
              } else {
                // console.log("重新加载api接口 内部被调用顺序1",apiName,params,callback)
                // 清空定时器后重新调用
                clearInterval(this.ComList[i]['data'].timer)
                this.ComList[i]['data'].timer = null

                this.registerApi({
                  name: i,
                  id: this.ComList[i].id,
                  type: this.ComList[i].type,
                }, {
                  apiName: apiName || undefined,
                  times: this.ComList[i].data['times'] || undefined,   		// 重写times 有更复杂的后面补上
                  params: params || undefined,
                  filters: this.ComList[i].data['filters'] || undefined,  	// 重写filters 有更复杂的后面补上
                  renderAfter: this.ComList[i].data['renderAfter'] || undefined,
                  connectComList: this.ComList[i].data['connectComList'] || 	// 重写关联组件列表 有更复杂的后面补上
                    undefined,
                });
                fn.call(this, apiName, params, callback)
              }
            }
          }

          // }, 1000)
        }

        // 各个组件配置css样式初始化
        if (initCssIsAObject) {
          let item = this.ComList[i];
          let itemCss = this.ComList[i]['initCss'];
          let dom = stage.get(item.id);
          // 避开地图或其它奇怪组件
          if (dom.container && dom.container[0]) {
            for (let key in itemCss) dom.container[0].style[key] = itemCss[key]
          } else {
            for (let key in itemCss) dom.container.style[key] = itemCss[key]
          }
        }
        // 配置面板的显隐方式		==========  	外部暴露toggle方法调用   入参"show"显示组件  入参"hide"隐藏组件
        if (toggleIsAObject && this.ComList[i]['toggleOption']['type']) {
          let item = this.ComList[i];
          let dom = stage.get(item.id);
          // 避开地图或其它奇怪组件
          if (dom.container && dom.container[0]) {
            dom = dom.container[0]
          } else {
            dom = dom.container
          };
          let duration = item['toggleOption'].duration || "1s";
          dom.style['transition'] = duration;
          this.ComList[i]['toggleOption']["curIsShow"] = true;


          switch (item['toggleOption'].type) {
            // 原地淡入淡出
            case "FadeInOut":
              this.ComList[i].toggle = (tp, arg) => {
                if (tp) {
                  let tpMap = {
                    show: () => {
                      this.ComList[i]['toggleOption']["curIsShow"] = true;
                      dom.style['opacity'] = 1;
                      dom.style['z-index'] = "auto";
                    },
                    hide: () => {
                      this.ComList[i]['toggleOption']["curIsShow"] = false;
                      dom.style['opacity'] = 0;
                      if (this.ComList[i].closeCallBack) { // 有声明关闭回调函数的
                        this.ComEvent[this.ComList[i].closeCallBack].call(this, arg)
                      }
                      if (this.ComList[i].openCallBack) { // 有声明显示回调函数的
                        this.ComEvent[this.ComList[i].openCallBack].call(this, arg)
                      }
                      setTimeout(() => {
                        dom.style['z-index'] = -999;
                      }, this.ComList[i]['toggleOption']["duration"].slice(0, -1) * 1000);
                    }
                  }
                  tpMap[tp]();
                } else {
                  this.ComList[i]['toggleOption']["curIsShow"] = !this.ComList[i]['toggleOption']["curIsShow"];
                  tpMap[this.ComList[i]['toggleOption']["curIsShow"] ? 'hide' : 'show']();
                }
              }
              break;
            // 带有偏移量的淡入淡出
            case "FadeOffsetInOut":
              let offSetIsArray = Object.prototype.toString.call(item['toggleOption'].offset) == "[object Array]";
              let originTransform = dom.style.transform,  // 界面上原始的偏移量
                originTransformX = originTransform.split("(")[1].slice(0, -1).split(",")[0].slice(0, -2),
                originTransformY = originTransform.split("(")[1].slice(0, -1).split(",")[1].slice(0, -2),
                offsetPosition = item['toggleOption'].offsetPosition || "left"; // 偏移位置
              let offsetX = 10;
              let offsetY = 0;
              if (offSetIsArray) {
                offsetX = item['toggleOption'].offset[0] || 10;
                offsetY = item['toggleOption'].offset[1] || 0;
              }
              this.ComList[i].toggle = (tp, arg) => {
                if (tp) {
                  let tpMap = {
                    show: () => {
                      stage.get(item.id).show();
                      dom.style['opacity'] = 0;
                      dom.style['transition'] = this.ComList[i]['toggleOption']["duration"];
                      setTimeout(() => {
                        this.ComList[i]['toggleOption']["curIsShow"] = true;
                        dom.style['opacity'] = 1;
                        dom.style['z-index'] = "auto";
                        dom.style['transform'] = originTransform;
                      }, 10);
                    },
                    hide: () => {
                      this.ComList[i]['toggleOption']["curIsShow"] = false;
                      dom.style['opacity'] = 0;
                      if (this.ComList[i].closeCallBack) { // 有声明关闭回调函数的
                        this.ComEvent[this.ComList[i].closeCallBack].call(this, arg)
                      }
                      if (this.ComList[i].openCallBack) { // 有声明显示回调函数的
                        this.ComEvent[this.ComList[i].openCallBack].call(this, arg)
                      }
                      setTimeout(() => {
                        dom.style['z-index'] = -999;
                        stage.get(item.id).hide();
                      }, this.ComList[i]['toggleOption']["duration"].slice(0, -1) * 1000);
                      if (offsetPosition == 'left') {
                        dom.style['transform'] = `translate(${Number(originTransformX) - offsetX}px,${Number(originTransformY) - offsetY}px)`;
                      } else if (offsetPosition == 'right') {
                        dom.style['transform'] = `translate(${Number(originTransformX) + offsetX}px,${Number(originTransformY) + offsetY}px)`;
                      }
                    }
                  }
                  tpMap[tp]();
                } else {
                  this.ComList[i]['toggleOption']["curIsShow"] = !this.ComList[i]['toggleOption']["curIsShow"];
                  tpMap[this.ComList[i]['toggleOption']["curIsShow"] ? 'hide' : 'show']();
                }
              }
              break;
          }

          if (this.ComList[i]['type'] == '弹窗组') {
            queue.push((comId = item.id, comName = i) => {
              // 显示组件  再调用自定义方法隐藏
              stage.get(comId).show();
              this.ComList[comName].toggle("hide");
            })
          } else {
            if (this.ComList[i]['toggleOption']['defaultShow']) {  // 文件组 默认显示
              queue.push((comId = item.id, comName = i) => {
                stage.get(item.id).show();
              })
            }
          }
        }

        // 自动绑定弹窗的关闭事件
        if (this.ComList[i].closeId) {
          if (!stage.get(this.ComList[i].closeId)) {
            console.warn('弹窗关闭事件绑定失败,请检查关闭id', i, this.ComList[i])
          } else {
            // 关闭组件的点击事件
            stage.get(this.ComList[i].closeId).container[0].addEventListener("click", () => {
              if (toggleIsAObject && this.ComList[i]['toggleOption']['type']) {
                this.ComList[i].toggle("hide");
              } else {	// 没有声明过自定义显示隐藏就默认使用datav组件自带的显隐方法
                this.ComList[i].hide();
              }
              // 有声明关闭回调函数的
              if (this.ComList[i].closeCallBack) {
                this.ComEvent[this.ComList[i].closeCallBack].call(this)
              }
              // 清空图层缓存
              for (let index = 0; index < this.Store.layerCache.length; index++) {
                let item = this.Store.layerCache[index];
                if (item.$name == i) {
                  this.Store.layerCache.splice(index, 1)
                  break;
                }
              }
            });
          }
        }

        // 打印组件
        if (this.ComList[i]['logCom']) {
          console.log("打印组件" + i, stage.get(this.ComList[i].id))
        }

      }
      let recur = () => {
        // console.log("当前初始化隐藏弹窗还剩缓存队列:", queue.length)
        if (queue.length > 0) {
          (queue.pop()).call(this);
          recur()
        }
      }
      recur();
    }
    init_ComEvent(obj) {
      return obj || {}
    }
    init_ComList(obj) {
      return obj || {}
    }
    init_ComApi(obj) {
      return obj || {}
    }
    request(url, data = {}, option = {}, ipType = 1) {
      let self = this
      return new Promise((resolve, reject) => {
        let env = self.Store.env;
        let options = Object.assign({
          url: self.Store.ipConfig[ipType][env].ip + self.Store.ipConfig[ipType][env].port + self.Store.ipConfig[ipType][env].suffix + url,
          type: "get",
          contentType: "application/json;charset=UTF-8",
          data: Object.assign({
            pageNum: 1,
            pageSize: 10000
          }, data),
        }, option)
        if (options.type.toLocaleLowerCase() === 'get') {
        } else if (options.type.toLocaleLowerCase() === 'post') {
          if (options.contentType.toLocaleLowerCase() ===
            'application/x-www-form-urlencoded') { } else if (options.contentType ===
              'application/json;charset=UTF-8') {
            options.dataType = 'json'
          } else if (options.contentType.toLocaleLowerCase() === 'multipart/form-data' ||
            options.contentType === false) {
            options.dataType = 'json'
            // let formData = new FormData(options.data)
            // xhr.send(formData);
          } else if (options.contentType.toLocaleLowerCase() === "text/xml") {
            options.dataType = 'XML'
            // TODO
          } else {
            reject(url + "类型错误");
            return console.log(url + '类型错误');
          }
        }
        $.ajax(Object.assign({
          beforeSend: function (XMLHttpRequest) {
            if (ipType == 1) {
              XMLHttpRequest.setRequestHeader('Authorization',
                "APPCODE fe6d7bf264754b7991a2bffab894b8c9");
            } else if (ipType == 2) {
              XMLHttpRequest.setRequestHeader('Authorization',
                "Bearer yypt_uaa_3706bbee8761447c8be2cb40e5c43a5f");
            }
          },
          success: function (res) {
            if (res.errCode == '1108110580') {
              // createToast(url + res.errMsg.slice(0,100))
              reject(url + "接口异常");
              return
            } else {
              resolve(res);
            }
          },
          error: function (e) {
            console.error("请求失败", e.status, e.responseText);
          }
        }, options))
      })
    }
    // 84坐标转2000坐标
    wgs84togcj02(lng, lat) {
      //定义一些常量
      var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
      var PI = 3.1415926535897932384626;
      var a = 6378245.0;
      var ee = 0.00669342162296594323;
      var transformlat = function transformlat(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math
          .sqrt(Math
            .abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret
      };
      var transformlng = function transformlng(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math
          .abs(
            lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret
      };
      var out_of_china = function out_of_china(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        // 纬度3.86~53.55,经度73.66~135.05 
        return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
      };
      var lat = +lat;
      var lng = +lng;
      if (out_of_china(lng, lat)) {
        return [lng, lat]
      } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat]
      }
    }
    // wgs84togcj02(lng,lat){
    //   var x = lng * 20037508.34 / 180;
    //   var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    //   y = y * 20037508.34 / 180;
    //   console.log("===",x,y)
    //   return [x,y];
    // }
    // 将点数据字符串格式化(浩鲸)
    filter_POINT(str) {
      let splArr = str.slice(6, -1).split(",");
      let coordinates = []
      splArr.forEach(i => {
        let _inner = i.split(' ')
        let obj = this.wgs84togcj02(_inner[0], _inner[1]);
        coordinates.push([obj[0], obj[1]])
      })
      return coordinates.flat()
    }
    // 将面数据字符串格式化(浩鲸)
    filter_POLYGON(str) {
      let splArr = str.slice(9, -2).split(",");
      let coordinates = []
      splArr.forEach(i => {
        let _inner = i.split(' ')
        let obj = this.wgs84togcj02(_inner[0], _inner[1]);
        coordinates.push([obj[0], obj[1]])
      })
      return [coordinates]
    }
    // 将线数据字符串格式化(浩鲸)
    filter_LINESTRING(str) {
      let splArr = str.slice(11, -1).split(",");
      let coordinates = []
      splArr.forEach(i => {
        let _inner = i.split(' ')
        let obj = this.wgs84togcj02(_inner[0], _inner[1])
        coordinates.push([obj[0], obj[1]])
      })
      return coordinates
    }
    // 将线数据字符串格式化(浩鲸)
    filter_LINE(str) {
      let splArr = str.slice(5, -1).split(",");
      let coordinates = []
      splArr.forEach(i => {
        let _inner = i.split(' ')
        let obj = this.wgs84togcj02(_inner[0], _inner[1])
        coordinates.push([obj[0], obj[1]])
      })
      return coordinates
    }
    // 隐藏所有的图层
    clear_layers() {
      this.Store.layerCache.forEach(i => this.ComList[i.$name].hide());
      this.Store.layerCache = [];
    }
    /**
     * 添加图层
     * @param {Object} $type		图层类型 (弹窗\点位\图层)
     * @param {Object} $single		图层是否单例 (单例重复点击不会取消、多例可单独取消和显示)
     * @param {Object} $name		图层名字
     * @param {Object} $clearAll	清除所有图层
     * @param {Object} $css			调用show函数传入的指定配置(详见show函数)
     * @param {Object} showCB		显示回调函数
     */
    add_layer($type, $single, $name, $clearAll, $css = { x: 0, y: 0, s: 0 }, showCB = () => { }) {
      if (stage.get(this.ComList[$name].id)) {
        if ($clearAll) {
          this.clear_layers();
        }
        if ($single) { // 单例模式
          if (this.Store.layerCache.findIndex(i => i.$name == $name) != -1) return
          this.Store.layerCache.push({ $type, $single, $name })
          this.ComList[$name].show($css.x, $css.y, $css.s, () => showCB());
        } else { // 多里摩士
          let hideIns = null;
          for (let i = 0; i < this.Store.layerCache.length; i++) {
            let item = this.Store.layerCache[i];
            if (item.$name == $name) {
              hideIns = $name;
              this.Store.layerCache.splice(i, 1)
              break;
            }
          }
          if (!hideIns) {
            this.Store.layerCache.push({ $type, $single, $name });
            this.ComList[$name].show($css.x, $css.y, $css.s, () => showCB());
          } else {
            this.ComList[$name].hide()
          }
        }
      } else {
        console.warn($name, '组件不存在')
      }
    }
    // 获取当前时间
    getCurrentDate() {
      let D = new Date();
      let _Y = D.getFullYear(),
        _M = D.getMonth(),
        _d = D.getDate();
      _M = _M + 1 < 10 ? "0" + (_M + 1) : _M + 1;
      _d = _d < 10 ? "0" + _d : _d;
      return {
        year: _Y,
        month: _M,
        date: _d
      }
    }
  }


















































  /**
 * 	ComList 组件列表使用注释
 * 
  商渔船防碰撞-文字": {
    id: "main-title_i10K9",
    type: "文本",   // 翻牌器等  目前无效果  后续封装上对应的css样式等
    closeId: "main-img_TzC0k",   // 关闭id 一般用在弹窗上面 点击关闭按钮自动关闭弹窗
    openCallBack:"openTest"	 	 // 此组件被打开 执行的回调函数 （弹窗）
    closeCallBack:"closeTest"	 // 此组件被隐藏 执行的回调函数 （弹窗）
    hideX:"-800px",				 // (一般用于弹窗)在X轴显示的位置  （废弃）
    hideY:"88px",				 // (一般用于弹窗)在Y轴显示的位置  （废弃）
    hideX:"800px",				 // (一般用于弹窗)在X轴隐藏的位置  （废弃）
    hideY:"88px",				 // (一般用于弹窗)在Y轴隐藏的位置  （废弃）
    event: { // 事件
      originClickName: "sycfpz_wz", // 元素原生绑定事件  	container[0].addEventListener
      origin1ClickName: "sycfpz_wz", // 元素原生绑定事件  	container.addEventListener
      clickName: "", // 组件自带点击事件
      mouseoverName: "", // 组件自带鼠标移入事件
      mouseoutName: "", // 组件自带鼠标移出事件
      tabClickName:"", // 组件自带tabClick事件
      originMouseInName: "" ,// 组件自带鼠标移入移除事件
      zoomendName:"",// 平面地图组件自带地图缩放事件
      rowClickedName:"",// 平面地图组件自带的row-clicked事件(列表)
      pickName:"",// citypro组件自带的pick事件(二维图标点击事件)
      leftClickName:"",// citypro组件自带的leftClick事件(三维图标点击事件)
      dotClickName:"",// 平面地图组件自带的dot-Click事件()
      richTabClickName:"",// 组件自带的richTabClick事件()
      cellClickName:"",// 复合滚动列表组件自带的行点击事件事()
    },
    data: { // 数据源
      api: "Getscsl", // 接口地址  配置了接口地址会默认请求
      params:{vaildMin:30},  // 接口参数
      times: 1000*30, // 接口自动轮询  n段时间内 请求多少次接口
      // staticData:[  // 配置了静态数据会默认覆盖掉编辑器内的数据
      // 	{name:666,atten:"注意，使用了静态数据不能和api接口同时存在"}
      // ],
      delayCall: 1000*3, // 延迟执行  TODO 后续补上
      connectComList:["浙闽交通流"],  // 关联字段（一个接口可以渲染多个组件）(记得被关联的组件要写filters函数会吧响应的数据带到这个组件的filter函数去)
      filters: function(data) { // 过滤器   写法跟可视编辑页面的过滤器无异
        try {
          return [{value:data.data.rows[0].sumCount}]   
        } catch (e) {
          console.log("Getscsl接口错误", e)
        }
      },
      afterRenfer: function(data){}  // filters函数执行完后执行的回调
    },
    // 重新加载api接口  重新加载api接口请求   (例:时间维度的切换/指标下转用的是同一个组件(下转后接口还能保持之前设定的轮询刷新))
    reloadApi:function(apiName,params,callback){
      callback()  // 如果要使用回调函数就调用它
    },
    toggleOption:{  // 切换显隐动画简易配置  (脚本调用方法:组件实例对象.toggle("show") 或 组件实例对象.toggle("hide"))
      type:"FadeInOut",  			//  显隐动画类型 FadeInOut(原地淡入淡出) FadeOffsetInOut(指定方向淡入淡出)
      duration:"1s",	   			//  动画持续时长
      offsetPosition:"left",		//  偏移的位置(注：只有使用FadeOffsetInOut类型才生效)
      offset:[30,0]  				//  x,y偏移量(注：只有使用FadeOffsetInOut类型才生效)
    }
  }
 */
  /**
   * 业务代码
   */
  /******************************************----------------业务代码开始----------------******************************************************/
  setTimeout(() => {
    let daohangye = new DataV({
      Store,
      // 注册组件配置列表   具体看上方文档
      ComList: {
        "模块炫光-进出港一体化":{id:"main-img_4RRpN",type:"单张图片"},
        "模块炫光-生产调度一体化":{id:"main-img_zDE2c",type:"单张图片"},
        "模块炫光-引航拖轮一体化":{id:"main-img_cNDlr",type:"单张图片"},
        "模块炫光-交通效率指标":{id:"main-img_lVJdC",type:"单张图片"}, // 长的
        "模块炫光-航道动态":{id:"main-img_XlWlS",type:"单张图片"},
        "模块炫光-锚地动态":{id:"main-img_BIn5g",type:"单张图片"},
        "模块炫光-重点物资运输":{id:"main-img_AIxEE",type:"单张图片"},
        "模块炫光-top背景":{id:"main-img_Fuf13",type:"单张图片"},
        "外链url-航路预测":{id:"iframe_nyAmD",type:"iframe"},


        

        "顶部标题": {
          id: "main-img_SgzEI", type: "单张图片",
          event: { originClickName: "topLabelClick" }
        },
        "进出港模块-时间tab": {
          id: "tab-list_dYo4t", type: "Tab列表",
          event: { handleClickName: "jcgmk_timeSelect" }
        },
        "进出港模块-进出港船舶数量": {
          id: "number-title-flop_7cbS2", type: "翻牌器",
          data: {
            api: "getEnterOuterShipCount", // 接口地址
            times: 1000 * 60 * 2,
            params: { dateType: "当日" },
            filters: function (res) { // 过滤器
              try {
                let cf = { "year": "当年", "month": "当月", "date": "当日" }
                let data = res.data.rows.filter(i => i.dateType == cf[this.Store.timeDimension['进出港模块']]);
                let count = 0;
                data.forEach(i => count += i.cnt)
                return [{ value: count }]
              } catch (e) {
                console.log("getEnterOuterShipCount接口错误", e)
              }
            },
            connectComList: ["进出港模块-出港船舶数量", '进出港模块-进港船舶数量'],  // 关联字段（一个接口可以渲染多个组件）
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          }
        },
        "进出港模块-出港船舶数量": {
          id: "number-title-flop_5uGup", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                let cf = { "year": "当年", "month": "当月", "date": "当日" }
                let data = res.data.rows.filter(i => i.dateType == cf[this.Store.timeDimension['进出港模块']] && i.enterOut == '出');
                return [{ value: data[0].cnt }]
              } catch (e) {
                console.log("getEnterOuterShipCount接口错误", e)
              }
            }
          },
          event: { originClickName: "jcgmk_cgcbsl" }
        },
        "进出港模块-进港船舶数量": {
          id: "number-title-flop_g7hbn", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                let cf = { "year": "当年", "month": "当月", "date": "当日" }
                let data = res.data.rows.filter(i => i.dateType == cf[this.Store.timeDimension['进出港模块']] && i.enterOut == '进');
                return [{ value: data[0].cnt }]
              } catch (e) {
                console.log("getEnterOuterShipCount接口错误", e)
              }
            }
          },
          event: { originClickName: "jcgmk_jgcbsl" }
        },
        "进出港模块-船舶轮播列表": {
          id: "carousel-table_Jxha2", type: "轮播列表",
          data: {
            api: "getEnterOuterShipList", // 接口地址
            times: 1000 * 60 * 2,
            params: { dateType: '当日' },  // 接口参数
            filters: function (res) { // 过滤器
              try {
                let seaRouteConfig = { 1: "虾峙门", 2: "条帚门", 3: "双屿门", 4: "西猴门", 5: "金塘大桥", 6: "青龙门" }
                return res.data.rows.map(i => {
                  i.arrangeLineTime_copy = i.arrangeLineTime
                  i.arrangeLineTime = i.arrangeLineTime != null ? i.arrangeLineTime.slice(11,-3) : ""
                  i.__seaRoute = seaRouteConfig[i.seaRoute] + i.enterOut;
                  i.tugNum = i.tugNum || 0
                  i.pilots = i.pilots || "自引"
                  return i
                })
              } catch (e) {
                console.log("getEnterOuterShipList接口错误", e)
              }
            },
            connectComList: ["进出港模块-进出港船舶详情列表弹窗-船舶轮播列表"],  // 关联字段（一个接口可以渲染多个组件）
          },
          event: {
            rowClickedName: "jcgmk_jcgcbxxxx"
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          }
        },
        "进出港模块-船舶轮播列表表头色块遮罩层": {
          id: "@double11-2017_main-color-block_1WWnF", type: "色块",
          event: {
            "originClickName": "jcgmk_shipLoopList"
          }
        },





        "生产调度模块-港口tab列表": {
          id: "tab-list_lxJas", type: "Tab列表",
          event: {
            // richTabClickName: "scdd_havenSelect"
            handleClickName: "scdd_havenSelect"
          }
        },

        "生产调度模块-船舶轮播列表-表头遮罩层": {
          id: "@double11-2017_main-color-block_OhG54", type: "色块",
          event: { originClickName: "ccdu_ShipLoopList" }
        },
        "生产调度模块-船舶轮播列表": {
          id: "carousel-table_Gs4wx", type: "轮播列表",
          data: {
            api: "getNbzsgcblb", // 接口地址
            times: 1000 * 60 * 2,
            params: { type: '宁波' },  // 接口参数   // 宁波/舟山
            filters: function (res) { // 过滤器
              try {
                return res.data.rows.map(i => {
                  i.dependPlantime = i.dependPlantime != null ? i.dependPlantime.slice(11,-3) : ""
                  i.jckhm = i.importMaincargoName + "/" + i.exportMaincargoName;
                  i.jckhyl = i.importTonTotal + "/" + i.exportTonTotal
                  return i
                })
              } catch (e) {
                console.log("getNbzsgcblb接口错误", e)
              }
            },
            connectComList: ["生产调度模块-船舶详情列表弹窗-滚动列表"]  // 关联字段（一个接口可以渲染多个组件）
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          },
          event: { rowClickedName: "scdd_shipDetail" }
        },
        "生产调度模块-今日货物吞吐量": {
          id: "number-title-flop_inIAi", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                let cf = { "舟山": "cargoThroughputDayZS", "宁波": "cargoThroughputDay" }  // 当年货物吞吐量_日(吨)_舟山   当年货物吞吐量_日(吨)_宁波
                fieldmap = cf[this.Store.havenDimension['生产调度模块']]
                return [{ value: res.data.rows[0][fieldmap] }]
              } catch (e) {
                console.log("Gettwljzxdbsdbsc接口错误", e)
              }
            },
          }
        },
        "生产调度模块-今日集装箱吞吐量": {
          id: "number-title-flop_hn671", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                let cf = { "舟山": "containerThroughputDayZS ", "宁波": "containerThroughputDay" }  //  当年集装箱量_日(TEU)_舟山   当年集装箱量_日(TEU)_宁波
                fieldmap = cf[this.Store.havenDimension['生产调度模块']]
                return [{ value: res.data.rows[0][fieldmap] }]
              } catch (e) {
                console.log("getEnterOuterShipCount接口错误", e)
              }
            },
          }
        },
        "引航/拖轮作业模块-港口tab列表": {
          id: "tab-list_doqDc", type: "Tab列表",
          event: { handleClickName: "yhtlzy_havenSelect" }
        },
        "引航/拖轮作业模块-船舶轮播列表-表头遮罩层": {
          id: "@double11-2017_main-color-block_iFqUX", type: "色块",
          event: { originClickName: "yhtlzy_ShipLoopList1" }
        },
        "引航/拖轮作业模块-船舶轮播列表": {
          id: "carousel-table_ODGVy", type: "轮播列表",
          data: {
            api: "getYhtlnbzsgcblb", // 接口地址
            times: 1000 * 60 * 2,
            params: { type: '宁波' },  // 接口参数   // 宁波/舟山
            filters: function (res) { // 过滤器
              try {
                return res.data.rows.map(i => {
                  // i.seaRoute = seaRouteConfig[i.seaRoute]
                  let str = ""
                  if (i.tugPlan) {
                    JSON.parse(i.tugPlan).forEach(type => {
                      if (type.OP_NAME != '其他') {
                        type.TUGS.forEach(ship => {
                          str += ship.NAME + ship.OP_NAME + ","
                        })
                      }
                    })
                  }
                  i.arrangeLineTime = i.arrangeLineTime != null ? i.arrangeLineTime.slice(11,-3) : ""
                  i.tugNum = i.tugNum || 0
                  i.__tugPlan = str ? str.slice(0, -1) : "-"
                  return i
                })
              } catch (e) {
                console.log("getYhtlnbzsgcblb接口错误", e)
              }
            },
            connectComList: ["引航拖轮作业模块-船舶详情列表弹窗-滚动复合列表"],  // 关联字段（一个接口可以渲染多个组件）
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          },
          event: { rowClickedName: "yhtlzy_shipDetail" }
        },

        "核心指标模块-年度集装箱量(年)": { id: "main-title_DfuM6", type: "通用标题" },
        "核心指标模块-年度集装箱量(月)": { id: "main-title_rBZns", type: "通用标题" },
        "核心指标模块-年度集装箱量(日)": { id: "main-title_OlDTt", type: "通用标题" },
        "核心指标模块-隐藏按钮": { id: "@double11-2017_main-color-block_mHpAF", type: "色块", event: { "originClickName": "hxzbmk_hideBtn" } },
        "核心指标模块-显示按钮": { id: "main-img_cxIAb", type: "图片", event: { "originClickName": "hxzbmk_showBtn" } },


        "核心指标模块-在港船舶总数": {
          id: "@Snxun_datav_sn-cp-number-step_bFdpB", type: "翻牌器",
          data: {
            api: "getZgcbzs", // 接口地址
            times: 1000 * 60 * 1,
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows[0].cnt }]
              } catch (e) {
                console.log("getZgcbzs接口错误", e)
              }
            }
          },
        },
        "核心指标模块-货物吞吐量": {
          id: "@Snxun_datav_sn-cp-number-step_n3Thr", type: "翻牌器",
          data: {
            api: "Gettwljzxdbsdbsc", // 接口地址
            times: 1000 * 30,
            params: { dateTimeDt: getCurrentDate() },
            filters: function (res) { // 过滤器
              try {
                return [{ value: (Number(res.data.rows[0].cargoThroughputYear) + Number(res.data.rows[0].cargoThroughputYearZs)) / 100000000 }]
              } catch (e) {
                console.log("Gettwljzxdbsdbsc接口错误", e)
              }
            },
            connectComList: [
              // "核心指标模块-年集装箱量", '核心指标模块-月集装箱量', '核心指标模块-日集装箱量', 
              '生产调度模块-今日货物吞吐量', '生产调度模块-今日集装箱吞吐量',
              '交通效率指标模块-本年经济航速船舶', '交通效率指标模块-本年经济航速减少碳排放', '交通效率指标模块-本年经济航速减少燃油消耗',
              '交通效率指标模块-本年经济航速节约成本'
            ],  // 关联字段（一个接口可以渲染多个组件）
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          }
        },
        // "核心指标模块-年集装箱量": {
        //   id: "@Snxun_datav_sn-cp-number-step_63EVo", type: "翻牌器",
        //   data: {
        //     filters: function (res) { // 过滤器
        //       try {
        //         return [{ value: (Number(res.data.rows[0].containerThroughputYear) + Number(res.data.rows[0].containerThroughputYearZs)) / 10000 }]
        //       } catch (e) {
        //         console.log("Gettwljzxdbsdbsc接口错误", e)
        //       }
        //     }
        //   }
        // },
        // "核心指标模块-月集装箱量": {
        //   id: "@Snxun_datav_sn-cp-number-step_pq4VN", type: "翻牌器", data: {
        //     filters: function (res) { // 过滤器
        //       try {
        //         return [{ value: Number(res.data.rows[0].containerThroughputMonth) + Number(res.data.rows[0].containerThroughputMonthZs) }]
        //       } catch (e) {
        //         console.log("Gettwljzxdbsdbsc接口错误", e)
        //       }
        //     }
        //   }
        // },
        // "核心指标模块-日集装箱量": {
        //   id: "@Snxun_datav_sn-cp-number-step_r1jeH", type: "翻牌器", data: {
        //     filters: function (res) { // 过滤器
        //       try {
        //         this.Store.module_hxzb['日集装箱量数值缓存'] = Number(res.data.rows[0].containerThroughputDay) + Number(res.data.rows[0].containerThroughputDayZs);
        //         let fn = () => {
        //           this.Store.module_hxzb['日集装箱量数值缓存'] += Math.floor((Math.random() * 3) + 1);
        //           console.log("==========", this.Store.module_hxzb['日集装箱量数值缓存'])
        //           stage.get("number-title-flop_fMIpH").render([{ value: this.Store.module_hxzb['日集装箱量数值缓存'] }])
        //         }
        //         fn();
        //         if (this.Store.times['日集装箱量']) {
        //           clearInterval(this.Store.times['日集装箱量'])
        //           this.Store.times['日集装箱量'] = null
        //         }
        //         this.Store.times['日集装箱量'] = setInterval(fn, 3000)
        //         return [{ value: Number(res.data.rows[0].containerThroughputDay) + Number(res.data.rows[0].containerThroughputDayZs) }]
        //       } catch (e) {
        //         console.log("Gettwljzxdbsdbsc接口错误", e)
        //       }
        //     }
        //   }
        // },




        "交通效率指标模块-时间tab列表": {
          id: "tab-list_ktWeA", type: "Tab列表",
          event: { handleClickName: "jtxlzb_timeSelect" }
        },
        "交通效率指标模块-虾峙门航道准点进港": {
          id: "number-title-flop_eUHOP", type: "翻牌器",
          data: {
            api: "GetXzmhdzdljg", // 接口地址
            times: 1000 * 60 * 2,
            params: { dateType: '天' },  // 接口参数   // （年、月、天）
            filters: function (res) { // 过滤器
              try {
                // return [{ value: res.data.rows[0].zdjgzs }]
                return [{ value: res.data.rows[0].jgzs }]
              } catch (e) {
                console.log("GetXzmhdzdljg接口错误", e)
              }
            },
            connectComList: ["交通效率指标模块-虾峙门航道准点进港准点率"],  // 关联字段（一个接口可以渲染多个组件）
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          }
        },
        "交通效率指标模块-直航进港": {
          id: "number-title-flop_VJUih", type: "翻牌器",
          data: {
            api: "dwd_ma_opt_direct_entry_port_df", // 接口地址
            times: 1000 * 60 * 2,
            params: { dateType: '当年' },  // 接口参数   // （年、月、天）
            filters: function (res) { // 过滤器
              try {
                let type = this.Store.timeDimension['交通效率指标模块'];
                let cf = { "year": "当年", "month": "当月", "date": "当日" }
                let total = 0;
                res.data.rows.filter(i => i.time == cf[type]).forEach(i => total += Number(i.directCnt))
                if (type == 'date') { total = 15 }
                return [{ value: total }]
              } catch (e) {
                console.log("dwd_ma_opt_direct_entry_port_df接口错误", e)
              }
            },
            connectComList: ["交通效率指标模块-直航进港趋势"],  // 关联字段（一个接口可以渲染多个组件）
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          },
          event: { originClickName: "jtxlzbmk_zhjg" }
        },
        "交通效率指标模块-直航进港趋势": {
          id: "indicator-trend_7rIOJ", type: "趋势",
          data: {
            filters: function (res) { // 过滤器
              try {
                let value = null;
                let type = this.Store.timeDimension['交通效率指标模块'];
                if (type == 'date') {
                  up = 18.00
                } else if (type == 'month') {
                  up = 17.25
                } else if (type == 'year') {
                  up = 20.45
                }
                return [{ value: up, base: 0 }]
              } catch (e) {
                console.log("dwd_ma_opt_direct_entry_port_df接口错误", e)
              }
            }
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          }
        },
        "交通效率指标模块-虾峙门航道准点进港准点率": {
          id: "@double11-2017_double11-2017-pie-percent_7MULj", type: "双11百分比饼图",
          data: {
            filters: function (res) { // 过滤器
              try {
                let val = res.data.rows[0].zdl;
                return [{ value: val ? Number(val.slice(0, -1)) / 100 : "" }]
              } catch (e) {
                console.log("GetXzmhdzdljg接口 关联组件错误", e)
              }
            }
          },
        },
        "交通效率指标模块-待泊船舶标题": {
          id: "main-title_2Moz9", type: "通用标题",
          event: { originClickName: "jtxlzb_dbcb_label" }
        },
        "交通效率指标模块-平均待泊标题": {
          id: "main-title_PVoty", type: "通用标题",
          event: { originClickName: "jtxlzb_pjdb_label" }
        },
        "交通效率指标模块-待泊船舶数": {
          id: "number-title-flop_22kFK", type: "翻牌器",
          data: {
            api: "Gettwljzxdbsdbsc", // 接口地址
            times: 1000 * 60 * 2,
            params: { dateTimeDt: getCurrentDate() },
            filters: function (res) { // 过滤器
              try {
                let cf = { "year": "anchorNumYear", "month": "anchorNumMonth", "date": "anchorNumDay" }
                return [{ value: res.data.rows[0][cf[this.Store.timeDimension['交通效率指标模块']]] }]
              } catch (e) {
                console.log("Gettwljzxdbsdbsc（待泊船舶数）接口错误", e)
              }
            }
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          }
        },
        "交通效率指标模块-平均待泊时长-天数": {
          id: "number-title-flop_qVk5O", type: "翻牌器",
          data: {
            api: "Gettwljzxdbsdbsc", // 接口地址
            times: 1000 * 60 * 2,
            params: { dateTimeDt: getCurrentDate() },
            filters: function (res) { // 过滤器
              try {
                let cf = { "year": "anchorHourYear", "month": "anchorHourMonth", "date": "anchorHourDay" };  // 给出的单位是分钟
                let timeDim = this.Store.timeDimension['交通效率指标模块']
                let value = Math.floor(res.data.rows[0][cf[timeDim]] / 60 / 24)
                return [{ value }]
              } catch (e) {
                console.log("Gettwljzxdbsdbsc接口错误", e)
              }
            },
            connectComList: ["交通效率指标模块-平均待泊时长-小时数"]
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          }
        },
        "交通效率指标模块-平均待泊时长-小时数": {
          id: "number-title-flop_ULBga", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                let cf = { "year": "anchorHourYear", "month": "anchorHourMonth", "date": "anchorHourDay" };  // 给出的单位是分钟
                let timeDim = this.Store.timeDimension['交通效率指标模块']
                let value = res.data.rows[0][cf[timeDim]] / 60 % 24
                return [{ value }]
              } catch (e) {
                console.log("Gettwljzxdbsdbsc接口错误", e)
              }
            }
          }
        },
        "交通效率指标模块-经济航速船舶标题": {
          id: "main-title_nOLtD", type: "通用标题",
          event: { originClickName: "jtxlzb_jjhscb_label" }
        },
        "交通效率指标模块-十大-抵港船旗国-标题": {
          id: "main-title_JtPxF", type: "通用标题",
          event: { originClickName: "jtxlzb_sd_dgcqg_label" }
        },
        "交通效率指标模块-十大-航运企业-标题": {
          id: "main-title_h2LSd", type: "通用标题",
          event: { originClickName: "jtxlzb_sd_hyqy_label" }
        },
        "交通效率指标模块-十大-抵港船旗国-五个一组1": {
          id: "@Snxun_datav_sn-cp-enumeration_it18T", type: "呈现类（自定义组件）",
          data: {
            api: "getDnsdhycqqd", // 接口地址
            times: 1000 * 60 * 2,
            filters: function (res) { // 过滤器
              try {
                let arr = res.data.filter(i => i.type == '十大船旗')
                arr.forEach((i, index) => {
                  i.id = index;
                  i.label = (index + 1) + "" + i.nationName + ":" + i.shipNum + "艘次"
                })
                return arr.slice(0, 5)
              } catch (e) {
                console.log("getDnsdhycqqd接口错误", e)
              }
            },
            connectComList: ['交通效率指标模块-十大-抵港船旗国-五个一组2', '交通效率指标模块-十大-航运企业-五个一组1', '交通效率指标模块-十大-航运企业-五个一组2']
          }
        },
        "交通效率指标模块-十大-抵港船旗国-五个一组2": {
          id: "@Snxun_datav_sn-cp-enumeration_TjJFP", type: "呈现类（自定义组件）",
          data: {
            filters: function (res) { // 过滤器
              try {
                let arr = res.data.filter(i => i.type == '十大船旗')
                arr.forEach((i, index) => {
                  i.id = index;
                  i.label = (index + 1) + "" + i.nationName + ":" + i.shipNum + "艘次"
                })
                return arr.slice(5, 10)
              } catch (e) {
                console.log("getDnsdhycqqd关联接口错误", e)
              }
            }
          }
        },
        "交通效率指标模块-十大-航运企业-五个一组1": {
          id: "@Snxun_datav_sn-cp-enumeration_ZlQmM", type: "呈现类（自定义组件）",
          data: {
            filters: function (res) { // 过滤器
              try {
                let arr = res.data.filter(i => i.type == '十大航运')
                arr.forEach((i, index) => {
                  i.id = index;
                  i.label = (index + 1) + "" + i.nationName + ":" + i.shipNum + "艘次"
                })
                return arr.slice(0, 5)
              } catch (e) {
                console.log("getDnsdhycqqd关联接口错误", e)
              }
            }
          }
        },
        "交通效率指标模块-十大-航运企业-五个一组2": {
          id: "@Snxun_datav_sn-cp-enumeration_5o1Ig", type: "呈现类（自定义组件）",
          data: {
            filters: function (res) { // 过滤器
              try {
                let arr = res.data.filter(i => i.type == '十大航运')
                arr.forEach((i, index) => {
                  i.id = index;
                  i.label = (index + 1) + "" + i.nationName + ":" + i.shipNum + "艘次"
                })
                return arr.slice(5, 10)
              } catch (e) {
                console.log("getDnsdhycqqd关联接口错误", e)
              }
            }
          }
        },
        "交通效率指标模块-本年经济航速船舶": {
          id: "number-title-flop_uSIEC", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows[0].economicSpeedShipYear }]
              } catch (e) {
                console.log("Gettwljzxdbsdbsc接口错误", e)
              }
            }
          }
        },
        "交通效率指标模块-本年经济航速减少碳排放": {
          id: "number-title-flop_hufkg", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows[0].carbonEmissionYear }]
              } catch (e) {
                console.log("Gettwljzxdbsdbsc接口错误", e)
              }
            }
          }
        },
        "交通效率指标模块-本年经济航速减少燃油消耗": {
          id: "number-title-flop_47V2G", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows[0].fuelMeterYear }]
              } catch (e) {
                console.log("Gettwljzxdbsdbsc接口错误", e)
              }
            }
          }
        },
        "交通效率指标模块-本年经济航速节约成本": {
          id: "number-title-flop_SjbBr", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows[0].reduceMoneyYear / 10000 }]
              } catch (e) {
                console.log("Gettwljzxdbsdbsc接口错误", e)
              }
            }
          }
        },


        "航道动态情况模块-今日通过量-下一页按钮": {
          id: "main-img_GYS14", type: "单张图片",
          event: { originClickName: "hddtqk_jrtgl_next" }
        },
        "航道动态情况模块-今日通过量-航门1-标题": {
          id: "number-title-flop_oncWV", type: "翻牌器",
          data: {
            api: "getGgmjrtgl",
            params: { type: "ddef337616c94e059981d65ac28e1a64" },  // 默认虾峙门
            times: 1000 * 60 * 2,
            filters: function (res) {
              let cnt = 0;
              res.data.rows.forEach(i => cnt += i.cnt)
              return [{
                "prefix": res.data.rows[0].areaName,
                "name": "",
                "value": cnt,
                "suffix": "艘次"
              }]
            },
            connectComList: ["航道动态情况模块-今日通过量-航门1-区域翻牌器"],  // 关联字段（一个接口可以渲染多个组件）
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          },
          event: { originClickName: "hddtqk_jrtgl_label1" }
        },
        "航道动态情况模块-今日通过量-航门1-区域翻牌器": {
          id: "@echarts_echarts-line-visualmap_vq3rP", type: "区域翻牌器",
          data: {
            filters: function (res) {
              let rederData = res.data.rows.map(i => {
                i.s = 'Beijing AQI';
                i.y = i.cnt;
                i.x = i.time;
                return i
              }).sort((a, b) => a.x - b.x)
              let noData = [
                {
                  "x": "00",
                  "y": 9,
                  "s": "Beijing AQI"
                },
                {
                  "x": "01",
                  "y": 5,
                  "s": "Beijing AQI"
                }
              ]
              return res.data.rows.length >= 2 ? rederData : []
            }
          }
        },
        "航道动态情况模块-今日通过量-航门2-标题": {
          id: "number-title-flop_uIdli", type: "翻牌器",
          data: {
            api: "getGgmjrtgl",
            params: { type: "6e06c1f2252e4e7690b483e008c6ae69" },  // 默认条帚门
            times: 1000 * 60 * 2,
            filters: function (res) {
              let cnt = 0;
              res.data.rows.forEach(i => cnt += i.cnt)
              return [{
                "prefix": res.data.rows[0].areaName,
                "name": "",
                "value": cnt,
                "suffix": "艘次"
              }]
            },
            connectComList: ["航道动态情况模块-今日通过量-航门2-区域翻牌器"],  // 关联字段（一个接口可以渲染多个组件）
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          },
          event: { originClickName: "hddtqk_jrtgl_label2" }
        },
        "航道动态情况模块-今日通过量-航门2-区域翻牌器": {
          id: "@echarts_echarts-line-visualmap_K3y6P", type: "区域翻牌器",
          data: {
            filters: function (res) {
              let rederData = res.data.rows.map(i => {
                i.s = 'Beijing AQI';
                i.y = i.cnt;
                i.x = i.time;
                return i
              }).sort((a, b) => a.x - b.x)
              return res.data.rows.length >= 2 ? rederData : []
            }
          }
        },
        "航道动态情况模块-航道吨位分布-百分比条形图": {
          id: "ml-hori-bar-percentage_4qHSD", type: "百分比条形图",
          data: {
            api: "getGgmhddwfbqk", // 接口地址
            times: 1000 * 60 * 2,
            filters: function (res) { // 过滤器
              try {
                let cf = {
                  "1万总吨以上": "1",
                  "3千-1万总吨": "2",
                  "5百-3千总吨": "3",
                  "5百总吨以下": "4",
                }

                return res.data.rows.filter(i => i.areaName == '双屿门' || i.areaName == '虾峙门').map(i => {
                  i.x = i.cnt;
                  i.y = i.areaName;
                  i.colorField = i.areaton
                  i.ind = cf[i.areaton]
                  delete i.cnt;
                  delete i.areaName
                  delete i.areaton
                  return i
                }).sort((a, b) => b.ind - a.ind)
              } catch (e) {
                console.log("getGgmhddwfbqk接口错误", e)
              }
            }
          }
        },
        "航道动态情况模块-航门通过量下钻弹窗-tab列表": {
          id: "@Snxun_datav_sn-cp-richTabs_hU2jx", type: "富Tab选项卡(自定义组件)",
          event: {
            richTabClickName: "hddtqk_hmtglxz_tabs"
          }
        },
        "航道动态情况模块-航道吨位分布-标题": {
          id: "main-title_v8VJ4", type: "通用标题",
          event: { originClickName: "hddtqk_hddwfb_showDialog" }
        },


        "锚地动态情况模块-标题": { id: "main-title_hUSrs", type: "通用标题", event: { originClickName: "mddtqk_label" } },
        "锚地动态情况模块-今日抛锚计划总数": {
          id: "number-title-flop_IPe9j", type: "翻牌器",
          data: {
            api: "getDqpmsmws", // 接口地址
            times: 1000 * 60 * 2,
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows[0].jhCnt }]
              } catch (e) {
                console.log("getDqpmsmws接口错误", e)
              }
            },
            connectComList: ["锚地动态情况模块-当前抛锚船数量", '锚地动态情况模块-锚位总数'],  // 关联字段（一个接口可以渲染多个组件）
          }
        },
        "锚地动态情况模块-当前抛锚船数量": {
          id: "number-title-flop_WQ24K", type: "翻牌器", data: {
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows[0].pmCnt }]
              } catch (e) {
                console.log("getDqpmsmws接口错误", e)
              }
            }
          }
        },
        "锚地动态情况模块-锚位总数": {
          id: "number-title-flop_0dOuT", type: "翻牌器", data: {
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows[0].mwCnt }]
              } catch (e) {
                console.log("getDqpmsmws接口错误", e)
              }
            }
          }
        },
        "锚地动态情况模块-锚地实时动态列表-表头遮罩色块": {
          id: "@double11-2017_main-color-block_iiaZ9", type: "色块", event: { originClickName: "mddtqk_mdssdtlb_detailList" }
        },
        "锚地动态情况模块-锚地实时动态列表-预约数遮罩色块": {
          id: "@double11-2017_main-color-block_Ge37W", type: "色块",
          event: {
            "originClickName": "mddtqk_mdssdtlb_yuyue_cellClick"
          }
        },
        "锚地动态情况模块-锚地实时动态列表": {
          id: "carousel-table_BitFL", type: "轮播列表",
          data: {
            api: "Ggmdssdt", // 接口地址
            times: 1000 * 60 * 2,
            filters: function (res) { // 过滤器
              try {
                return res.data.rows.map(i => {
                  i.pmmw = i.pmCnt + "/" + i.mwCnt
                  return i
                })
              } catch (e) {
                console.log("Ggmdssdt接口错误", e)
              }
            }
          },
          event: {
            "rowClickedName": "mddtqk_mdssdtlb_cellClick"
          }
        },
        "锚地动态情况模块-保税油锚地加注动态-标题": {
          id: "main-title_dK4f7", type: "通用标题",
          event: {
            "originClickName": "mddtqk_bsymddtjz_label"
          }
        },
        "锚地动态情况模块-保税油锚地加注状态-等待中": {
          id: "number-title-flop_ytykb", type: "翻牌器",
          data: {
            api: "GetBsymdjzzt", // 接口地址
            times: 1000 * 60 * 2,
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows.filter(i => i.type == "等待中数量")[0].cnt }]
              } catch (e) {
                console.log("GetBsymdjzzt接口错误", e)
              }
            },
            connectComList: ["锚地动态情况模块-保税油锚地加注状态-进行中", '锚地动态情况模块-保税油锚地加注状态-已完成'],  // 关联字段（一个接口可以渲染多个组件）
          }
        },
        "锚地动态情况模块-保税油锚地加注状态-进行中": {
          id: "number-title-flop_d1QUm", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows.filter(i => i.type == '计划中数量')[0].cnt }]
              } catch (e) {
                console.log("GetBsymdjzzt接口错误", e)
              }
            }
          }
        },
        "锚地动态情况模块-保税油锚地加注状态-已完成": {
          id: "number-title-flop_Mgqgm", type: "翻牌器",
          data: {
            filters: function (res) { // 过滤器
              try {
                return [{ value: res.data.rows.filter(i => i.type == '完成数量')[0].cnt }]
              } catch (e) {
                console.log("GetBsymdjzzt接口错误", e)
              }
            }
          }
        },
        "锚地动态情况模块-保税油锚地加注状态-轮播-饼图1": {
          id: "pie-ranking_vuQOo", type: "轮播饼图",
          data: {
            api: "GetGmdbngylfb", // 接口地址
            times: 1000 * 60 * 2,
            filters: function (res) { // 过滤器
              try {
                return res.data.rows.map(i => {
                  // i.x = i.name;
                  // i.y = i.gyl;
                  i.type = i.name;
                  i.value = i.gyl;
                  return i
                })
              } catch (e) {
                console.log("GetGmdbngylfb接口错误", e)
              }
            },
            connectComList: ["锚地动态情况模块-保税油锚地加注状态-轮播-饼图呈现类1"],  // 关联字段（一个接口可以渲染多个组件）
          }
        },
        "锚地动态情况模块-保税油锚地加注状态-轮播-饼图呈现类1": {
          id: "@Snxun_datav_sn-cp-enumeration_lQoHK", type: "呈现类(自定义组件)",
          data: {
            filters: function (res) { // 过滤器
              try {
                return res.data.rows.map((i, index) => {
                  i.label = i.name;
                  i.id = (index + 1) * 100
                  return i
                })
              } catch (e) {
                console.log("GetGmdbngylfb接口错误", e)
              }
            }
          }
        },
        "锚地动态情况模块-保税油锚地加注状态-轮播-折线柱状图2": {
          id: "ml-line-basic_iYqco", type: "折线图",
          // data: {
          //   api: "Getjzlzjsc_jbsy", // 接口地址
          //   params: { dateType: "年" },  // 天-近15天  月-近6月  年-近4年
          //   times: 1000 * 60 * 2,
          //   filters: function (res) { // 过滤器
          //     try {
          //       res.data.rows.unshift({
          //         time: "2018",
          //         gyl: "1163251",
          //         zysc: 1497
          //       })
          //       return res.data.rows.map((i, index) => {
          //         // i.z = i.zysc;
          //         i.colorField = '供油量'
          //         i.x = i.time;
          //         i.y = i.gyl / 10000
          //         return i
          //       }).slice(0, -1).sort((a, b) => a.x - b.x)
          //     } catch (e) {
          //       console.log("GetGmdbngylfb接口错误", e)
          //     }
          //   }
          // }
        },
        "在港重点物资运输模块-当年重点运输船舶列表": {
          id: "carousel-table_pkIU3", type: "轮播列表",
          data: {
            api: "getDqzgzdwzyccbshws", // 接口地址
            times: 1000 * 60 * 2,
            filters: function (res) { // 过滤器
              try {
                return res.data.rows.map(i => {
                  i.hwlCnt = parseFloat(Math.floor(i.hwlCnt / 10000)).toLocaleString() + "万吨"
                  return i
                })
              } catch (e) {
                console.log("getDqzgzdwzyccbshws接口错误", e)
              }
            },
          },
          event: { rowClickedName: "zgzdwzys_ShipLoopList" }
        },
        "在港重点物资运输模块-当年重点运输船舶列表-表头遮罩层": {
          id: "@double11-2017_main-color-block_OohHD", type: "色块"
        },



        /**
         * 弹窗下 相关组件
         */
        "进出港模块-进出港船舶详情列表弹窗-标题": {
          id: "main-title_xSfUT", type: "通用标题"
        },
        "进出港模块-进出港船舶详情列表弹窗-表头遮罩层": {
          id: "@double11-2017_main-color-block_3LMX3", type: "色块",
          event:{
            originClickName:"jcgmk_tableHeadClick"
          }
        },
        "进出港模块-进出港船舶详情列表弹窗-船舶轮播列表": {
          id: "@Snxun_datav_sn-cp-srcoll-table_qTFZw", type: "轮播列表(自定义组件)",
          data: {
            filters: function (res) { // 过滤器
              res = JSON.parse(JSON.stringify(res))
              try {
                let seaRouteConfig = { 1: "虾峙门", 2: "条帚门", 3: "双屿门", 4: "西猴门", 5: "金塘大桥", 6: "青龙门" }
                let dataSourceConfig = { 1: "宁波港调度", 2: "舟山引航站", 3: "外网申请", 4: "舟山港务局" }
                let eventStatusConfig = { 4: "正常", 6: "待定" }

                let sortFieldMap = {  // 根据航道进行第二重排序
                  "虾峙门": "1",
                  "条帚门": "2",
                  "金塘大桥": "3",
                  "西猴门": "4",
                  "双屿门": "5",
                }

                let djk = 0,
                  dck = 0;  // 待进口、待出口
                res.data.rows.forEach(i => {
                  if (i.jhzt == '待出口') {
                    dck += 1
                  } else if (i.jhzt == '待进口') {
                    djk += 1
                  }
                })
                stage.get("main-title_xSfUT").render([{ value: `待进口共 ${djk} 条,待出口共 ${dck} 条` }])

                return res.data.rows.map(i => {
                  let str = ''
                  if (i.towBoatInfoJsons) {
                    JSON.parse(i.towBoatInfoJsons).forEach(type => {
                      if (type.OP_NAME != '其他') {
                        type.TUGS.forEach(ship => {
                          str += ship.NAME + ":" + ship.OP_NAME + ","
                        })
                      }
                    })
                  }

                  // i.arrangeLineTime = i.arrangeLineTime != null ? i.arrangeLineTime.slice(5,-2) : ""
                  i.zuoyejieshushijian = i.zuoyejieshushijian != null ? i.zuoyejieshushijian.slice(11,-3) : ""
                  i.pilots = i.pilots || "自引"
                  i.seaRoute = seaRouteConfig[i.seaRoute];
                  i.dataSource = dataSourceConfig[i.dataSource];
                  i.__towBoatInfoJsons = str ? str.slice(0, -1) : "-";
                  i.__eventStatus = eventStatusConfig[i.eventStatus];
                  return i
                })



              } catch (e) {
                console.log("getEnterOuterShipList接口错误", e)
              }
            },
            renderAfter: function () { }
          },
          event: { cellClickName: "jcgmk_jcgcbxxxx" }
        },
        "进出港模块-进出港船舶详情列表弹窗-app业务申报tab按钮": {
          id: "@Snxun_datav_sn-cp-richTabs_qM9Tq", type: "富Tab选项卡(自定义组件)",
          event: { richTabClickName: "jcgmk_shipLoopList_tab" }
        },
        "进出港模块-APP弹窗-上一页按钮": { id: "@datav-form_interact-button_9E1He", type: "按钮", event: { originClickName: "jcgmk_apptc_prevBtn" } },
        "进出港模块-APP弹窗-下一页按钮": { id: "@datav-form_interact-button_k7HJx", type: "按钮", event: { originClickName: "jcgmk_apptc_nextBtn" } },
        "进出港模块-业务申报弹窗-上一页按钮": { id: "@datav-form_interact-button_wY4l5", type: "按钮", event: { originClickName: "jcgmk_ywsbtc_prevBtn" } },
        "进出港模块-业务申报弹窗-下一页按钮": { id: "@datav-form_interact-button_k6fc5", type: "按钮", event: { originClickName: "jcgmk_ywsbtc_nextBtn" } },
        "进出港模块-APP弹窗-图片展示": { id: "main-img_q19eA", type: "图片" },
        "进出港模块-业务申报弹窗-图片展示": { id: "main-img_iYI3K", type: "图片" },
        "进出港模块-进出港船舶详情浮窗-船舶标题": { id: "main-title_jsCRt", type: "通用标题" },
        "进出港模块-进出港船舶详情浮窗-万能表格": { id: "@Snxun_datav_sn-cp-omnipotent-table_5qSYI", type: "万能表格内容(自定义组件)" },
        "进出港模块-航门进出港弹窗-标题": { id: "main-title_393Mv", type: "翻牌器" },
        "进出港模块-航门进出港弹窗-虾峙门数量": {
          id: "number-title-flop_TQb52", type: "翻牌器",
          event: { originClickName: "jcgmk_hmjcgtc_xzm" }
        },
        "进出港模块-航门进出港弹窗-金塘大桥数量": {
          id: "number-title-flop_Fp6h5", type: "翻牌器",
          event: { originClickName: "jcgmk_hmjcgtc_jtdq" }
        },
        "进出港模块-航门进出港弹窗-西堠门大桥数量": {
          id: "number-title-flop_6CLuW", type: "翻牌器",
          event: { originClickName: "jcgmk_hmjcgtc_xhmdq" }
        },
        "进出港模块-航门进出港弹窗-双屿门数量": {
          id: "number-title-flop_xQe4X", type: "翻牌器",
          event: { originClickName: "jcgmk_hmjcgtc_sym" }
        },
        "进出港模块-航门进出港弹窗-条帚门数量": {
          id: "number-title-flop_LrlgC", type: "翻牌器",
          event: { originClickName: "jcgmk_hmjcgtc_tzm" }
        },
        "进出港模块-航门进出港下钻弹窗-标题": { id: "main-title_Garrq", type: "通用标题" },
        "进出港模块-航门进出港下钻弹窗-船舶列表": {
          id: "carousel-table_gs338", type: "轮播列表",
          event: { rowClickedName: "jcgmk_hmjcgxztc_shipLoop" }
        },




        "生产调度模块-船舶详情列表弹窗-滚动列表": {
          id: "carousel-table_GoBPJ", type: "轮播列表",
          data: {
            filters: function (res) {
              try {
                // console.log("生产调度模块-船舶详情列表弹窗-滚动列表，接口数", res)
                return res.data.rows.map(i => {
                  i.hw = i.importMaincargoName + ":" + i.importTonTotal + "/" + i.exportMaincargoName + ":" + i.exportTonTotal
                  i.zym = i.dependVesselOperatorName + '/' + i.leaveVesselOperatorName

                  // i.dependPlantime != null ? i.dependPlantime.slice(5) : ""
                  i.leavePlantime = i.leavePlantime != null ? i.leavePlantime.slice(11,-3) : ""
                  // 列表上默认显示泊位 没有数据时候取进/离开作业名
                  i.shortBerthName = i.shortBerthName || i.operatorcompanyName
                  return i
                }).slice(0, 100)
              } catch (e) {
                console.log("getNbzsgcblb 接口关联列表数据错误", e)
              }
            }
          },
          event: { rowClickedName: "scdd_shipDetail" }
        },
        "引航拖轮作业模块-船舶详情列表弹窗-滚动复合列表": {
          id: "carousel-table_LZCrx", type: "轮播列表",
          data: {
            filters: function (res) {
              try {
                // console.log("引航拖轮作业模块-船舶详情列表弹窗-滚动复合列表，接口数", res)
                return res.data.rows.slice(0, 100)
              } catch (e) {
                console.log("getYhtlnbzsgcblb 接口关联列表数据错误", e)
              }
            }
          },
          event: { rowClickedName: "yhtlzy_shipDetail" }
        },
        "引航拖轮作业模块-今日拖轮安排": {
          id: "number-title-flop_DbRga", type: "翻牌器",
          data: {
            api: "Getyhshtls", // 接口地址
            times: 1000 * 60 * 2,
            params: { city: 1 },  // （1：宁波、2：舟山）
            filters: function (res) {
              try {
                return [{ value: res.data.rows[0].jrtls }]
              } catch (e) {
                console.log("Getyhshtls 接口错误", e)
              }
            },
            connectComList: ["引航拖轮作业模块-今日引航安排"],  // 关联字段（一个接口可以渲染多个组件）
          },
          reloadApi: function (apiName, params, callback) { // 重新加载api接口
            callback()  // 如果要使用回调函数就调用它
          }
        },
        "引航拖轮作业模块-今日引航安排": {
          id: "number-title-flop_j97Bt", type: "翻牌器",
          data: {
            filters: function (res) {
              try {
                return [{ value: res.data.rows[0].jryhaps }]
              } catch (e) {
                console.log("Getyhshtls 接口关联错误", e)
              }
            }
          },
        },

        "航道动态情况模块-航道动态标题": {
          id: "main-title_UriKh", type: "通用标题",
          event: { originClickName: "hddtqk_hddt_label" },
        },
        "航道动态情况模块-条帚门航道能力下钻弹窗-日期tab": { id: "tab-list_x9L8z", type: "tab列表", event: { handleClickName: "hddtqk_tzmhdnlxz_timeClick" } },
        "航道动态情况模块-条帚门航道能力下钻弹窗-船舶流量日期tab": { id: "tab-list_PZJfW", type: "tab列表", event: { handleClickName: "hddtqk_tzmhdnlxz_cbll_timeClick" } },
        // "航道动态情况模块-条帚门航道能力下钻弹窗-总艘次": { id: "number-title-flop_Hhpy2", type: "翻牌器" },
        // "航道动态情况模块-条帚门航道能力下钻弹窗-货物量": { id: "number-title-flop_tue4w", type: "翻牌器" },
        "航道动态情况模块-条帚门航道能力下钻弹窗-年通过量": { id: "number-title-flop_Wiuyx", type: "翻牌器" },
        "航道动态情况模块-条帚门航道能力下钻弹窗-月通过量": { id: "number-title-flop_Hhpy2", type: "翻牌器" },
        "航道动态情况模块-条帚门航道能力下钻弹窗-日通过量": { id: "number-title-flop_tue4w", type: "翻牌器" },


        "航道动态情况模块-条帚门航道能力下钻弹窗-船舶流量": { id: "ml-area-counter_1oAWE", type: "区域翻牌器" },
        "航道动态情况模块-虾改条的船舶清单弹窗-船舶列表": { id: "carousel-table_WHpEo", type: "轮播列表", event: { rowClickedName: "hddtqk_xgtqd_shipLoop" } },
        "航道动态情况模块-虾改条的船舶清单弹窗-标题": { id: "main-title_hQnYW", type: "通用标题" },
        "航道动态情况模块-航门通过量下钻弹窗-标题": { id: "main-title_sXzjY", type: "通用标题" },
        "航道动态情况模块-航门通过量下钻弹窗-通过数量": { id: "number-title-flop_dFcwt", type: "翻牌器" },
        "航道动态情况模块-航门通过量下钻弹窗-区域翻牌器": { id: "@echarts_echarts-line-visualmap_4beiU", type: "区域翻牌器" },
        "航道动态情况模块-航门通过量下钻弹窗-船舶列表": { id: "carousel-table_UrvTY", type: "轮播列表", event: { rowClickedName: "hddtqk_hmtglxz_shipLoop" } },
        "航道动态情况模块-航道吨位分布弹窗-虾峙门饼图": { id: "ml-pie-multi-radius_l13nJ", type: "轮播饼图" },
        "航道动态情况模块-航道吨位分布弹窗-西堠门大桥饼图": { id: "ml-pie-multi-radius_QeEDy", type: "轮播饼图" },
        "航道动态情况模块-航道吨位分布弹窗-条帚门饼图": { id: "ml-pie-multi-radius_hVNb0", type: "轮播饼图" },
        "航道动态情况模块-航道吨位分布弹窗-双屿门饼图": { id: "ml-pie-multi-radius_Pg6xa", type: "轮播饼图" },
        "航道动态情况模块-航道吨位分布弹窗-金塘大桥饼图": { id: "ml-pie-multi-radius_bOsrW", type: "轮播饼图" },


        "锚地动态情况模块-锚地清单下钻弹窗-通用标题": { id: "main-title_yxI8r", type: "通用标题" },
        "锚地动态情况模块-锚地清单下钻弹窗-船舶列表": { id: "carousel-table_3kpnC", type: "轮播列表", event: { rowClickedName: "hddtqk_mdxzqd_shipLoop" } },
        "锚地动态情况模块-保税油加注今日计划弹窗-船舶列表": { id: "carousel-table_xUTjU", type: "轮播列表", event: { rowClickedName: "hddtqk_bsyjzjrjh_shipLoop" } },
        "重点物资运输情况模块-在港重点物资清单弹窗-通用标题": { id: "main-title_0lNs3", type: "通用标题" },
        "重点物资运输情况模块-在港重点物资清单弹窗-船舶列表": { id: "carousel-table_iEQfk", type: "轮播列表", event: { rowClickedName: "hddtqk_zgzdwzqdlb_shipLoop" } },
        "锚地动态情况模块-保税油下钻弹窗-历年保税油加注船舶列表": { id: "carousel-table_s1wFQ", type: "轮播列表" },
        "锚地动态情况模块-保税油下钻弹窗-本年度各锚地加注船舶列表": { id: "carousel-table_4tKkg", type: "轮播列表" },
        "锚地动态情况模块-锚地实时动态弹窗-船舶列表": {
          id: "carousel-table_2LQRT", type: "轮播列表", event: {
            "rowClickedName": "mddtqk_mdssdtlb_cellClick"
          }
        },


        "交通效率指标模块-经济航速列表弹窗-通用标题": { id: "main-title_C80Fe", type: "通用标题" },
        "交通效率指标模块-经济航速列表弹窗-船舶列表": {
          id: "carousel-table_xXqz8", type: "轮播列表",
          event: {
            rowClickedName: "jtxlzb_ShipLoopList"
          }
        },
        "交通效率指标模块-经济航速船详细弹窗-万能表格": { id: "@Snxun_datav_sn-cp-omnipotent-table_7aZcf", type: "万能表格内容" },
        "交通效率指标模块-经济航速船舶指标对比弹窗-tab列表": {
          id: "tab-list_DAE4j", type: "tab列表",
          event: {
            handleClickName: "jtxlzb_jjhscbzbdb_tab"
          }
        },
        "交通效率指标模块-待泊时长弹窗-tab列表": {
          id: "tab-list_JUUvL", type: "tab列表",
          event: {
            handleClickName: "jtxlzb_dbsctc_tab"
          }
        },
        "交通效率指标模块-待泊船舶弹窗-tab列表": {
          id: "tab-list_L3YeT", type: "tab列表",
          event: {
            handleClickName: "jtxlzb_dbcbtc_tab"
          }
        },
        "交通效率指标模块-待泊时长弹窗-柱状图": {
          id: "bar-basic_XqJfj", type: "柱状图"
        },
        "交通效率指标模块-待泊时长弹窗-平均待泊时长-天": {
          id: "number-title-flop_rFDzP", type: "翻牌器"
        },
        "交通效率指标模块-待泊时长弹窗-平均待泊时长-小时": {
          id: "number-title-flop_HYIPj", type: "翻牌器"
        },
        "交通效率指标模块-待泊时长弹窗-平均待泊时长-同比增长降低": {
          id: "main-title_A3mB8", type: "翻牌器"
        },
        "交通效率指标模块-待泊船舶弹窗-条形图": {
          id: "ml-bar-hori-basic_nYeXi", type: "条形图"
        },
        "交通效率指标模块-十大船旗国下钻弹窗-船舶列表": {
          id: "carousel-table_nhd3F", type: "轮播列表"
        },
        "交通效率指标模块-十大航运企业下钻弹窗-船舶列表": {
          id: "carousel-table_qFi2S", type: "轮播列表"
        },

        /**
         * ===地图相关组件===
         */
        "基础平面地图": { id: "datav-2dmap_Cuu2u", type: "地图", event: { zoomendName: "mapZoome" } },
        "基础平面地图-锚地动态-所有锚地": {
          logCom: true,
          id: "datav-2dmap-area_4o3kS", type: "区域热力层", event: { clickName: "mapClickRoadstead" },
          data: {
            api: "getmdsj", // 接口地址
            times: 1000 * 60 * 60 * 24,
            params: { dateTimeDt: getCurrentDate() },
            filters: function (res) { // 过滤器
              try {
                let data = res.data.rows;
                let Arr = data.reduce((T, C, I) => {
                  if (C.geom) {
                    let arr = [];
                    if (C.geom.indexOf("MULTIPOLYGON(((") != -1) {
                      arr = this.filter_MULTIPOLYGON(C.geom)
                    } else if (C.geom.indexOf("POLYGON((") != -1) {
                      arr = this.filter_POLYGON(C.geom)
                    }
                    T.push({
                      "type": "Feature",
                      "properties": {
                        "name": C.elementNameCn,
                        "areaId": C.id
                      },
                      "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [arr]
                      }
                    })
                  }
                  return T
                }, []);

                stage.get('datav-2dmap-area_4o3kS').setGeojson({
                  "type": "FeatureCollection",
                  "name": "所有锚地面",
                  "crs": {
                    "type": "name",
                    "properties": {
                      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                  },
                  "features": Arr
                });
                stage.get('datav-2dmap-area_4o3kS').render({
                  "type": "FeatureCollection",
                  "name": "所有锚地面",
                  "crs": {
                    "type": "name",
                    "properties": {
                      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                  },
                  "features": Arr
                });
              } catch (e) {
                console.log("getmdsj接口错误", e)
              }
            }
          }
        },
        "基础平面地图-生产调度-码头点位": { id: "datav-2dmap-vector-scatter_P1XSw", type: "矢量散点层" },
        "基础平面地图-重点物资-物资船点位": { id: "datav-2dmap-icon-scatter_3qDy4", type: "图标散点层" },


        "基础平面地图-地图上的船舶点位": { id: "datav-2dmap-icon-scatter_LMlvd", type: "混合散点层" },
        "基础平面地图-地图上的船舶气泡": { id: "datav-2dmap-carousel-label_NZM4s", type: "轮播标签层" },
        "基础平面地图-聚焦标注点": { id: "datav-2dmap-icon-scatter_ry5YA", type: "图标散点层" },
        "基础平面地图-模拟数据的假船": { id: "datav-2dmap-icon-scatter_IHgOO", type: "图标散点层" },
        "基础平面地图-模拟数据的船舶气泡": { id: "datav-2dmap-carousel-label_rINne", type: "轮播标签层" },

        
        /**
         * ===遮罩层组件===
         */
        "进出港模块-进出港船舶详情列表弹窗-图片遮罩层": { id: "main-img_UtWhj", type: "单张图片", initCss: { "pointer-events": "none" } },
        "进出港模块-APP弹窗-图片遮罩层": { id: "main-img_l3e8N", type: "单张图片", initCss: { "pointer-events": "none" } },
        "进出港模块-业务申报弹窗-图片遮罩层": { id: "main-img_AVRWb", type: "单张图片", initCss: { "pointer-events": "none" } },
        "进出港模块-业务申报弹窗-图片遮罩层2": { id: "main-img_iYI3K", type: "单张图片", initCss: { "pointer-events": "none" } },
        "航道动态情况模块-航道吨位分布弹窗-图片遮罩层": { id: "main-img_TWSGP", type: "单张图片", initCss: { "pointer-events": "none" } },
        "航道动态情况模块-航门通过量下钻弹窗-图片遮罩层": { id: "main-img_hrZ2h", type: "单张图片", initCss: { "pointer-events": "none" } },
        "航道动态情况模块-航门通过量下钻弹窗-图片遮罩层2": { id: "main-img_rSRj2", type: "单张图片", initCss: { "pointer-events": "none" } },
        "交通效率指标模块-经济航速船舶指标对比弹窗-图片遮罩层": { id: "main-img_nKp8V", type: "单张图片", initCss: { "pointer-events": "none" } },
        "生产调度模块-图片遮罩层": { id: "main-img_6RWPN", type: "单张图片", initCss: { "pointer-events": "none" } },
        "蒙版-图片遮罩层": { id: "main-img_9Zchs", type: "单张图片", initCss: { "pointer-events": "none" } },
        /**
         * ===弹窗组件===
         */

        "进出港模块-进出港船舶详情列表弹窗": {
          id: "group_EARrT", type: "弹窗组", closeId: "main-img_JSvRu",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "left",
            offset: [30, 0]
          },
          closeCallBack: "closeCallBack_jcgmk_shipLoopList"
        },
        "进出港模块-APP弹窗": {
          id: "group_koBdu", type: "弹窗组", closeId: "main-img_y4Rqj",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "left",
            offset: [30, 0]
          },
          openCallBack: "openCallBack_jcgmk_app",
          closeCallBack: "closeCallBack_jcgmk_app"
        },
        "进出港模块-业务申报弹窗": {
          id: "group_t4O1g", type: "弹窗组", closeId: "main-img_dvt29",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "left",
            offset: [30, 0]
          },
          openCallBack: "openCallBack_jcgmk_ywsb",
          closeCallBack: "closeCallBack_jcgmk_ywsb"
        },
        "进出港模块-航门进出港弹窗": {
          id: "group_rSCTY", type: "弹窗组", closeId: "main-img_x6kpW",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "left",
            offset: [30, 0]
          }
        },
        "进出港模块-航门进出港下钻弹窗": {
          id: "group_OwExk", type: "弹窗组", closeId: "main-img_n5zlh",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "left",
            offset: [30, 0]
          }
        },
        "进出港模块-进出港船舶详情浮窗": {
          id: "group_HBsBY", type: "弹窗组", closeId: "main-img_1n4FA",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "left",
            offset: [10, 0]
          },
        },
        "生产调度模块-船舶详情列表弹窗": {
          id: "group_mV8ym", type: "弹窗组", closeId: "main-img_eTyqd",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "left",
            offset: [30, 0]
          },
        },
        "引航拖轮作业模块-船舶详情列表": {
          id: "group_etxL5", type: "弹窗组", closeId: "main-img_cGyl8",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "left",
            offset: [30, 0]
          },
        },
        "交通效率指标模块-直航进港下钻弹窗": {
          id: "group_iiUJ6", type: "弹窗组", closeId: "main-img_gf6CA",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "bottom",
            offset: [30, 0]
          }
        },
        "交通效率指标模块-待泊船舶弹窗": {
          id: "group_V866v", type: "弹窗组", closeId: "main-img_hx9iX",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "bottom",
            offset: [30, 0]
          }
        },
        "交通效率指标模块-待泊时长弹窗": {
          id: "group_Clxdb", type: "弹窗组", closeId: "main-img_RHSlr",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "bottom",
            offset: [30, 0]
          }
        },
        "交通效率指标模块-十大船旗国下钻弹窗": {
          id: "group_q61Aj", type: "弹窗组", closeId: "main-img_j5X6g",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "bottom",
            offset: [30, 0]
          }
        },
        "交通效率指标模块-十大航运企业下钻弹窗": {
          id: "group_lmOSo", type: "弹窗组", closeId: "main-img_h9R9f",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "bottom",
            offset: [30, 0]
          }
        },
        "交通效率指标模块-经济航速船列表弹窗": {
          id: "group_6xDb3", type: "弹窗组", closeId: "main-img_OW642",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "bottom",
            offset: [30, 0]
          }
        },
        "交通效率指标模块-经济航速船详细弹窗": {
          id: "group_KD0eE", type: "弹窗组", closeId: "main-img_duwb0",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "bottom",
            offset: [30, 0]
          }
        },
        "交通效率指标模块-经济航速列表弹窗": {
          id: "group_58dtb", type: "弹窗组", closeId: "main-img_DMdE2",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "bottom",
            offset: [30, 0]
          },
          closeCallBack: "closeCallBack_jtxlzb_jjhslb"
        },
        "交通效率指标模块-经济航速船舶指标对比弹窗": {
          id: "group_fasVT", type: "弹窗组", closeId: "main-img_KATCS",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "bottom",
            offset: [30, 0]
          }
        },
        "航道动态情况模块-航道吨位分布弹窗": {
          id: "group_G4k9R", type: "弹窗组", closeId: "main-img_hVjWk",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },
        "航道动态情况模块-航路预测弹窗": {
          id: "group_G7cVP", type: "弹窗组", closeId: "main-img_tjWGM",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },
        "航道动态情况模块-航门通过量下钻弹窗": {
          id: "group_V7F1N", type: "弹窗组", closeId: "main-img_1JXFJ",
          closeCallBack: "closeCallBack_hddtqk_hmtglxz",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },
        "航道动态情况模块-条帚门航道能力下钻弹窗": {
          id: "group_z8OQi", type: "弹窗组", closeId: "main-img_HS5XO",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },
        "航道动态情况模块-虾改条的船舶清单弹窗": {
          id: "group_NzaT1", type: "弹窗组", closeId: "main-img_1iFj8",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },
        "锚地动态情况模块-锚地实时动态弹窗": {
          id: "group_dHIvn", type: "弹窗组", closeId: "main-img_ux1lB",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },
        "锚地动态情况模块-锚地清单下钻弹窗": {
          id: "group_DnheN", type: "弹窗组", closeId: "main-img_eGH2p",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },
        "锚地动态情况模块-保税油加注今日计划弹窗": {
          id: "group_irXDQ", type: "弹窗组", closeId: "main-img_K71wa",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },
        "锚地动态情况模块-预约情况下钻弹窗": {
          id: "group_LANj6", type: "弹窗组", closeId: "main-img_tHw9i",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },
        "锚地动态情况模块-保税油下钻弹窗": {
          id: "group_PCKAk", type: "弹窗组", closeId: "main-img_h6Kkp",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },

        "重点物资运输情况模块-在港重点物资清单弹窗": {
          id: "group_t1Bxe", type: "弹窗组", closeId: "main-img_yEsyE",
          toggleOption: {
            type: "FadeOffsetInOut",
            duration: "0.4s",
            offsetPosition: "right",
            offset: [30, 0]
          }
        },



        /**
         * 轮播组
         */
        "轮播模块-锚地动态情况-饼图轮播1": {
          id: "group_vkn9a", type: "轮播组",
          toggleOption: {
            type: "FadeInOut",
            duration: "0.4s",
          },
          event: {
            "origin1ClickName": "mddtmk_mdxzqctc"
          }
        },
        "轮播模块-锚地动态情况-柱状轮播2": {
          id: "group_u7jw7", type: "轮播组",
          toggleOption: {
            type: "FadeInOut",
            duration: "0.4s",
          },
          event: {
            "origin1ClickName": "mddtmk_mdxzqctc"
          }
        },
        "轮播模块-船旗航运-轮播1": {
          id: "group_5l34t", type: "轮播组",
          toggleOption: {
            defaultShow: true,
            type: "FadeInOut",
            duration: "0.4s",
          }
        },
        "轮播模块-船旗航运-轮播2": {
          id: "group_W3JiQ", type: "轮播组",
          toggleOption: {
            defaultShow: true,
            type: "FadeInOut",
            duration: "0.4s",
          }
        },
        /**
         * 其它组
         */
        "核心指标-指标合集组": {
          id: "group_js6Kf", type: "其它文件组",
          toggleOption: {
            defaultShow: true,
            type: "FadeInOut",
            duration: "0.4s",
          }
        },


      },
      // 事件委托
      ComEvent: {
        topLabelClick: function (e) {   // 顶部标题点击事件
          if (window.$$$backToInit) return console.warn("请不要重复点击")

          stage.get(this.ComList['基础平面地图-生产调度-码头点位'].id).hide();
          stage.get(this.ComList['基础平面地图-锚地动态-所有锚地'].id).hide();
          stage.get(this.ComList['基础平面地图-聚焦标注点'].id).hide();
          stage.get(this.ComList['基础平面地图-重点物资-物资船点位'].id).hide();
          stage.get(this.ComList['基础平面地图-模拟数据的假船'].id).hide();
          stage.get(this.ComList['基础平面地图-模拟数据的船舶气泡'].id).hide();

          

          // stage.get(this.ComList['基础平面地图'].id).viewer.map.flyTo([30, 122], 10.4);

          // 关闭所有已打开的弹窗
          for (let i in this.ComList) {
            if (this.ComList[i].type != "轮播组" && this.ComList[i].type != "其它文件组") {  // 弹窗组才生效
              if (this.ComList[i].toggleOption && this.ComList[i].toggleOption.curIsShow) this.ComList[i].toggle("hide")
            }
          }
          window.$$$backToInit = setTimeout(() => {
            clearTimeout(window.$$$backToInit)
            window.$$$backToInit = null;
          }, 2000)
        },
        jcgmk_timeSelect: function (e) {
          console.log("这个组件有毒，初始化默认会执行一次jcgmk_timeSelect")
          let cf = { "year": "当年", "month": "当月", "date": "当日" };
          this.Store.timeDimension['进出港模块'] = e.type;
          this.ComList['进出港模块-进出港船舶数量'].reloadApi("getEnterOuterShipCount", {}, () => { });
          this.ComList['进出港模块-船舶轮播列表'].reloadApi("getEnterOuterShipList", { dateType: cf[this.Store.timeDimension['进出港模块']] }, () => { })
        },
        jcgmk_cgcbsl: function () {
          this.ComList['进出港模块-航门进出港弹窗'].toggle("show");
          stage.get(this.ComList['进出港模块-航门进出港弹窗-标题'].id).render([{ value: "出港数量" }])
          this.Store.module_jcgyit['enterOut'] = '出'

          this.ComApi['getCblbtoHmsl'].call(this, { enterOut: "出" }).then(res => {
            try {
              let fieldMap = {
                "金塘大桥": "进出港模块-航门进出港弹窗-金塘大桥数量",
                "虾峙门": "进出港模块-航门进出港弹窗-虾峙门数量",
                "西堠门大桥": "进出港模块-航门进出港弹窗-西堠门大桥数量",
                "双屿门": "进出港模块-航门进出港弹窗-双屿门数量",
                "条帚门": "进出港模块-航门进出港弹窗-条帚门数量",
              }
              res.data.rows.forEach(i => {
                stage.get(this.ComList[fieldMap[i.seaRoute]].id).render([{ value: i.cnt }])
                delete fieldMap[i.seaRoute]
              })
              for (let i in fieldMap) {
                stage.get(this.ComList[fieldMap[i]].id).render([{ value: 0 }])
              }
            } catch (e) {
              console.log("getCblbtoHmsl接口错误", e)
            }
          })
        },
        jcgmk_jgcbsl: function () {
          this.ComList['进出港模块-航门进出港弹窗'].toggle("show");
          stage.get(this.ComList['进出港模块-航门进出港弹窗-标题'].id).render([{ value: "进港数量" }])
          this.Store.module_jcgyit['enterOut'] = '进'
          this.ComApi['getCblbtoHmsl'].call(this, { enterOut: "进" }).then(res => {
            try {
              let fieldMap = {
                "金塘大桥": "进出港模块-航门进出港弹窗-金塘大桥数量",
                "虾峙门": "进出港模块-航门进出港弹窗-虾峙门数量",
                "西堠门大桥": "进出港模块-航门进出港弹窗-西堠门大桥数量",
                "双屿门": "进出港模块-航门进出港弹窗-双屿门数量",
                "条帚门": "进出港模块-航门进出港弹窗-条帚门数量",
              }
              res.data.rows.forEach(i => {
                stage.get(this.ComList[fieldMap[i.seaRoute]].id).render([{ value: i.cnt }])
                delete fieldMap[i.seaRoute]
              })
              for (let i in fieldMap) {
                stage.get(this.ComList[fieldMap[i]].id).render([{ value: 0 }])
              }
            } catch (e) {
              console.log("getCblbtoHmsl接口错误", e)
            }
          })
        },
        get_shipDetail: function (mmsi) { // 船舶聚焦
          console.log(11111111)
          if (mmsi) {
            this.ComApi['getShipInfoByPolygonOrgGet'].call(this, { mmsi }).then(res => {
              let da = res.data.rows[0]
              if (da) {
                let lnglatArr = this.wgs84togcj02(da.lon, da.lat);
                stage.get(this.ComList['基础平面地图'].id).viewer.map.flyTo([da.lat, da.lon], 12);

                stage.get(this.ComList['基础平面地图-聚焦标注点'].id).render([{ lng: da.lon, lat: da.lat }]);
                stage.get(this.ComList['基础平面地图-聚焦标注点'].id).show();
              }
            })
          }
        },
        jtxlzb_timeSelect: function (e) {
          console.log("这个组件有毒，初始化默认会执行一次jtxlzb_timeSelect")
          let cf = { "year": "年", "month": "月", "date": "天" };
          this.Store.timeDimension['交通效率指标模块'] = e.type
          this.ComList['交通效率指标模块-虾峙门航道准点进港'].reloadApi('GetXzmhdzdljg', { dateType: cf[this.Store.timeDimension['交通效率指标模块']] }, () => { })
          this.ComList['交通效率指标模块-待泊船舶数'].reloadApi('Gettwljzxdbsdbsc', { dateTimeDt: getCurrentDate() }, () => { })
          this.ComList['交通效率指标模块-平均待泊时长-天数'].reloadApi('Gettwljzxdbsdbsc', { dateTimeDt: getCurrentDate() }, () => { })
          this.ComList['交通效率指标模块-直航进港'].reloadApi('dwd_ma_opt_direct_entry_port_df', {}, () => { })

        },
        scdd_havenSelect: function (e) {
          this.Store.havenDimension['生产调度模块'] = e.content;
          let wharf = stage.get(this.ComList['基础平面地图-生产调度-码头点位'].id);
          wharf.show();
          this.ComApi['getMtdw'].call(this, { type: e.content }).then(res => {
            let Arr = res.data.rows.reduce((T, C, I) => {
              if (C.graphData && C.graphData.indexOf("POINT(") != -1) {
                let arr = [];
                arr = this.filter_POINT(C.graphData)
                T.push({
                  lng: arr[0],
                  lat: arr[1],
                  info: C.name
                })
              }
              return T
            }, []);
            wharf.render(Arr)
          })

          // 重载组件的api接口
          this.ComList['生产调度模块-船舶轮播列表'].reloadApi("getNbzsgcblb", { type: this.Store.havenDimension['生产调度模块'] }, () => { })
          this.ComList['核心指标模块-货物吞吐量'].reloadApi("Gettwljzxdbsdbsc", { dateTimeDt: getCurrentDate() }, () => { })
        },
        yhtlzy_havenSelect: function (e) {
          this.Store.havenDimension['引航/拖轮作业模块'] = e.content;
          // 重载组件的api接口
          this.ComList['引航/拖轮作业模块-船舶轮播列表'].reloadApi("getYhtlnbzsgcblb", { type: this.Store.havenDimension['引航/拖轮作业模块'] }, () => { })
          let cf = { "宁波": 1, "舟山": 2 }
          this.ComList['引航拖轮作业模块-今日拖轮安排'].reloadApi("Getyhshtls", { city: cf[this.Store.havenDimension['引航/拖轮作业模块']] }, () => { })
        },
        hddtqk_jrtgl_next: function (e) { // 航道动态情况-今日通过量-下一页事件
          let comShowHide = (type = 'show') => {
            stage.get(this.ComList['航道动态情况模块-今日通过量-航门2-标题'].id)[type]();
            stage.get(this.ComList['航道动态情况模块-今日通过量-航门2-区域翻牌器'].id)[type]();
          }




          this.Store.module_hddtqk['curPageFor今日通过量'] += 1;
          let len = this.Store.module_hddtqk.havenList.length;
          let list = this.Store.module_hddtqk.havenList;
          let count = this.Store.module_hddtqk['curPageFor今日通过量'];
          if (count > Math.ceil(len / 2)) {
            this.Store.module_hddtqk['curPageFor今日通过量'] = 1;
          }
          count = this.Store.module_hddtqk['curPageFor今日通过量']
          // 1  0 1 2*1-2  2*1-1
          // 2  2 3 2*2-2  2*2-1
          // 3  4 5 2*3-2  2*3-1

          // stage.get(this.ComList['航道动态情况模块-今日通过量-航门1-标题'].id).render([
          //   {
          //     "prefix": list[count * 2 - 2],
          //     "name": "",
          //     "value": Math.ceil(Math.random() * 1000),
          //     "suffix": "条"
          //   }
          // ])
          if (list[count * 2 - 1]) {
            // stage.get(this.ComList['航道动态情况模块-今日通过量-航门2-标题'].id).render([
            //   {
            //     "prefix": list[count * 2 - 1],
            //     "name": "",
            //     "value": Math.ceil(Math.random() * 1000),
            //     "suffix": "条"
            //   }
            // ])
            comShowHide('show');
          } else {
            comShowHide('hide');
          }
          this.ComList['航道动态情况模块-今日通过量-航门1-标题'].reloadApi('getGgmjrtgl', { type: this.Store.module_hddtqk.havenIdList[list[count * 2 - 2]] }, () => { })
          this.ComList['航道动态情况模块-今日通过量-航门2-标题'].reloadApi('getGgmjrtgl', { type: this.Store.module_hddtqk.havenIdList[list[count * 2 - 1]] }, () => { })
        },
        hddtqk_jrtgl_label1: function (e) {  // 航道动态情况-今日通过量-区域标题1 点击事件
          let list = this.Store.module_hddtqk.havenList;
          let name = list[this.Store.module_hddtqk['curPageFor今日通过量'] * 2 - 2];
          let renderDom = stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-tab列表'].id);
          let renderList = [
            // {
            //   "id": 100,
            //   "label": "一路视频",
            //   "active": false
            // },
            // {
            //   "id": 200,
            //   "label": "清单列表",
            //   "active": true
            // }
          ];
          renderDom.render(renderList)
          this.ComList['航道动态情况模块-航门通过量下钻弹窗'].toggle("show");
          stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-标题'].id).render([{ value: `${name}通过量` }])

          if (name) {
            // this.ComApi['getGgmjrtglcbqd'].call(this, { type: this.Store.module_hddtqk.havenIdList[name] }).then(res => {
            //   try {
            //     stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-船舶列表'].id).render(res.data.rows)
            //   } catch (ee) {
            //     console.log("getGgmjrtglcbqd接口错误", ee)
            //   }
            // })
            let cf = {
              "虾峙门": 1,
              "条帚门": 2,
              "双屿门": 3,
              "西猴门": 4,
              "金塘大桥": 5,
              "青龙门": 6
            }
            this.ComApi['getEnterOuterShipList'].call(this, { seaRoute: cf[name], dateType: "当日", }).then(res => {
              try {
                stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-船舶列表'].id).render(res.data.rows.map(i => {
                  i.arrangeLineTime = i.arrangeLineTime != null ? i.arrangeLineTime.slice(5) : ""
                  return i
                }))
              } catch (ee) {
                console.log("getEnterOuterShipList接口错误", ee)
              }
            })

            this.ComApi['getGgmjrtgl'].call(this, { type: this.Store.module_hddtqk.havenIdList[name] }).then(res => {
              try {
                let cnt = 0;
                res.data.rows.forEach(i => cnt += i.cnt)
                stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-通过数量'].id).render([{
                  "prefix": name,
                  "name": "",
                  "value": cnt,
                  "suffix": "艘次"
                }])
                stage.get("main-title_sXzjY").render([{ "value": `${name}通过量` }])
                let rederData = res.data.rows.map(i => {
                  i.s = 'Beijing AQI';
                  i.y = i.cnt;
                  i.x = i.time;
                  return i
                }).sort((a, b) => a.x - b.x)
                stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-区域翻牌器'].id).render(res.data.rows.length >= 2 ? rederData : [])
              } catch (ee) {
                console.log("getGgmjrtgl接口错误", ee)
              }
            })
          }
        },
        hddtqk_jrtgl_label2: function (e) {  // 航道动态情况-今日通过量-区域标题2 点击事件
          let list = this.Store.module_hddtqk.havenList;
          let name = list[this.Store.module_hddtqk['curPageFor今日通过量'] * 2 - 1];
          let renderDom = stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-tab列表'].id)
          let renderList = [
            // {
            //   "id": 100,
            //   "label": "一路视频",
            //   "active": false
            // },
            // {
            //   "id": 200,
            //   "label": "清单列表",
            //   "active": true
            // },
            {
              "id": 300,
              "label": "航道能力",
              "active": false
            }
          ];
          renderDom.render(name == '条帚门' ? renderList : [])
          this.ComList['航道动态情况模块-航门通过量下钻弹窗'].toggle("show")

          if (name) {
            // this.ComApi['getGgmjrtglcbqd'].call(this, { type: this.Store.module_hddtqk.havenIdList[name] }).then(res => {
            //   try {
            //     stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-船舶列表'].id).render(res.data.rows)
            //   } catch (ee) {
            //     console.log("getGgmjrtglcbqd接口错误", ee)
            //   }
            // })
            let cf = {
              "虾峙门": 1,
              "条帚门": 2,
              "双屿门": 3,
              "西猴门": 4,
              "金塘大桥": 5,
              "青龙门": 6
            }
            this.ComApi['getEnterOuterShipList'].call(this, { seaRoute: cf[name], dateType: "当日", }).then(res => {
              try {
                stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-船舶列表'].id).render(res.data.rows.map(i => {
                  i.arrangeLineTime = i.arrangeLineTime != null ? i.arrangeLineTime.slice(5) : ""
                  return i
                }))
              } catch (ee) {
                console.log("getEnterOuterShipList接口错误", ee)
              }
            })

            this.ComApi['getGgmjrtgl'].call(this, { type: this.Store.module_hddtqk.havenIdList[name] }).then(res => {
              try {
                let cnt = 0;
                res.data.rows.forEach(i => cnt += i.cnt)
                stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-通过数量'].id).render([{
                  "prefix": name,
                  "name": "",
                  "value": cnt,
                  "suffix": "艘次"
                }])
                stage.get("main-title_sXzjY").render([{ "value": `${name}通过量` }])
                let rederData = res.data.rows.map(i => {
                  i.s = 'Beijing AQI';
                  i.y = i.cnt;
                  i.x = i.time;
                  return i
                }).sort((a, b) => a.x - b.x)
                stage.get(this.ComList['航道动态情况模块-航门通过量下钻弹窗-区域翻牌器'].id).render(res.data.rows.length >= 2 ? rederData : [])
              } catch (ee) {
                console.log("getGgmjrtgl接口错误", ee)
              }
            })
          }
        },
        mddtqk_label: function (e) { // 锚地动态情况模块-标题 点击事件
          this.ComApi['getmdsj'].call(this).then(res => {
            try {
              stage.get(this.ComList['基础平面地图-锚地动态-所有锚地'].id).show();
              let data = res.data.rows;
              let Arr = data.reduce((T, C, I) => {
                if (C.geom) {
                  let arr = [];
                  if (C.geom.indexOf("MULTIPOLYGON(((") != -1) {
                    arr = this.filter_MULTIPOLYGON(C.geom)
                  } else if (C.geom.indexOf("POLYGON((") != -1) {
                    arr = this.filter_POLYGON(C.geom)
                  }
                  T.push({
                    "type": "Feature",
                    "properties": {
                      "name": C.element_name_cn,
                      "areaId": C.id
                    },
                    "geometry": {
                      "type": "MultiPolygon",
                      "coordinates": [arr]
                    }
                  })
                }
                return T
              }, []);
              stage.get(this.ComList['基础平面地图-锚地动态-所有锚地'].id).setGeojson({
                "type": "FeatureCollection",
                "name": "所有锚地面",
                "crs": {
                  "type": "name",
                  "properties": {
                    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                  }
                },
                "features": Arr
              });
              stage.get(this.ComList['基础平面地图-锚地动态-所有锚地'].id).render({
                "type": "FeatureCollection",
                "name": "所有锚地面",
                "crs": {
                  "type": "name",
                  "properties": {
                    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                  }
                },
                "features": Arr
              });
            } catch (e) {
              console.error('getmdsj接口错误', e)
            }
          })

        },
        mddtqk_mdssdtlb_detailList: function (param) { // 锚地动态情况模块-锚地实时动态列表-表头遮罩点击事件
          this.ComList['锚地动态情况模块-锚地实时动态弹窗'].toggle("show");
          this.ComApi['Ggmdssdt'].call(this).then(res => {
            try {
              stage.get(this.ComList['锚地动态情况模块-锚地实时动态弹窗-船舶列表'].id).render(res.data.rows.map(i => {
                i.pmmw = i.pmCnt + "/" + i.mwCnt
                return i
              }))
            } catch (e) {
              console.log("Ggmdssdt接口错误", e)
            }
          })
        },
        mapZoome: function (n) {
          console.log('平面地图zoomend', n, n.target.getZoom(), n.target.getCenter())
        },
        mapClickRoadstead: function (e) { // 地图 锚地点击事件

          this.ComApi['getMdmbjh'].call(this, { type: e.name }).then(res => {
            try {
              stage.get(this.ComList['锚地动态情况模块-锚地清单下钻弹窗-通用标题'].id).render([{ value: `${e.name} ${e.other.pmCnt + "/" + e.other.mwCnt}` }])

              let dom = stage.get(this.ComList['锚地动态情况模块-锚地清单下钻弹窗-船舶列表'].id);
              let dataList = res.data.rows;
              if (dataList.length == 0) {
                dom.render([])
              } else {
                // 组件间相互传数据怕有影响 用map返回
                dom.render(dataList.map(i => {
                  i.jhjcgsj = `抛锚:${i.predictAnchorTime != null ? i.predictAnchorTime.slice(5,-3) : ""}<br>起锚:${i.predictMoveAnchorTime != null ? i.predictMoveAnchorTime.slice(5,-3) : ""}`
                  return i
                }).slice(0, 100))
              }

              // 分页请求
              let totalPage = Math.ceil(res.data.totalNum / res.data.pageSize);
              let runArr = [];
              let arr = [];
              for (let i = 2; i <= totalPage; i++) {
                runArr.push(this.ComApi['getMdmbjh'].call(this, { type: e.name, pageNum: i }))
              }
              Promise.all(runArr).then(res => {
                res.forEach(i => {
                  i ? dataList.push(i.data.rows) : ""
                });
                dataList = dataList.flat();
                dataList.forEach((i, j) => {
                  if (i && i.lon && i.lat) {
                    let lnglatArr = this.wgs84togcj02(i.lon, i.lat);
                    i.dotid = j + 1;
                    i.lng = i.lon;
                    i.lat = i.lat;
                    i.shipname = i.shipName;
                    arr.push(i)
                  };
                });
              })
            } catch (e) {
              console.error('getMdmbjh接口错误', e)
            }
          })
          this.ComList['锚地动态情况模块-锚地清单下钻弹窗'].toggle("show")
        },
        zgzdwzys_ShipLoopList: function (e) { // 在港重点物资运输模块-当年重点运输船舶列表 当行点击事件
          this.ComList['重点物资运输情况模块-在港重点物资清单弹窗'].toggle("show");

          this.ComApi['getZgzdwzyscbqd'].call(this, { type: e.loadCargo }).then(res => {
            try {
              stage.get(this.ComList['重点物资运输情况模块-在港重点物资清单弹窗-通用标题'].id).render([{ value: `${e.loadCargo}物资共 ${res.data.totalNum} 艘` }])
              stage.get(this.ComList['重点物资运输情况模块-在港重点物资清单弹窗-船舶列表'].id).render(res.data.rows)
            } catch (e) {
              console.log("getZgzdwzyscbqd接口错误", e)
            }
          })

          this.ComApi['getZgzdwzyscbqd_polygon'].call(this, { type: e.loadCargo }).then(res => {
            try {
              let arr = [];
              res.data.rows.forEach((i, j) => {
                if (i && i.lon && i.lat) {
                  let lnglatArr = this.wgs84togcj02(i.lon, i.lat);
                  i.dotid = j + 1;
                  i.name = i.shipNameCn;
                  i.lng = i.lon;
                  i.lat = i.lat;
                  arr.push(i)
                };
              });
              stage.get(this.ComList['基础平面地图-重点物资-物资船点位'].id).render(arr);
              stage.get(this.ComList['基础平面地图-重点物资-物资船点位'].id).show();
            } catch (E) {
              console.log("getZgzdwzyscbqd_polygon接口错误", E)
            }
          })
        },
        hddtqk_tzmhdnlxz_timeClick: function (e) { // 航道动态情况模块-条帚门航道能力下钻弹窗-日期tab 点击事件
          console.log("这个组件有毒，初始化默认会执行一次hddtqk_tzmhdnlxz_timeClick")
          let cf = { "year": "年", "month": "月", "date": "天" };
          let { year, month, date } = this.getCurrentDate()
          this.Store.module_hddtqk['curDialogTimeDimensionFor条帚门艘次'] = e.type;
          this.ComApi['getTsmZscYhl'].call(this, { dateType: cf[e.type], dateStr: `${year}-${month}-${date}` }).then(res => {

            stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-年通过量'].id).render([{ value: res.data.rows[0].yearCnt }]);
            stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-月通过量'].id).render([{ value: res.data.rows[0].monthCnt }]);
            stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-日通过量'].id).render([{ value: res.data.rows[0].dayCnt }]);
            // stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-总艘次'].id).render([{ value: res.data[0].cnt }]);
            // stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-货物量'].id).render([{ value: res.data[0].yhl }]);
          })
        },
        hddtqk_tzmhdnlxz_cbll_timeClick: function (e) { // 航道动态情况模块-条帚门航道能力下钻弹窗-船舶流量日期tab 点击事件
          console.log("这个组件有毒，初始化默认会执行一次hddtqk_tzmhdnlxz_cbll_timeClick")
          let cf = { "year": "近3年", "month": "近6月" };
          this.Store.module_hddtqk['curDialogTimeDimensionFor条帚门船舶流量'] = e.type;
          this.ComApi['getTsmShipFlow'].call(this, { timeDimension: cf[e.type] }).then(res => { // 近3年(默认)、近6月
            let da = res.data.rows;
            stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-船舶流量'].id).render(da.map(i => {
              i.x = i.date;
              i.y = i.cnt;
              return i
            }));
          })
        },
        hddtqk_hmtglxz_shipLoop: function (e) {
          this.ComEvent['get_shipDetail'].call(this, e.mmsi)
        },
        hddtqk_xgtqd_shipLoop: function (e) {
          this.ComEvent['get_shipDetail'].call(this, e.mmsi)
        },
        hddtqk_bsyjzjrjh_shipLoop: function (e) {
          this.ComEvent['get_shipDetail'].call(this, e.mmsi)
        },
        hddtqk_zgzdwzqdlb_shipLoop: function (e) {
          this.ComEvent['get_shipDetail'].call(this, e.mmsi);
        },
        hddtqk_mdxzqd_shipLoop: function (e) {
          this.ComEvent['get_shipDetail'].call(this, e.mmsi)
        },
        jcgmk_shipLoopList: function () { // 进出港模块船舶轮播列表单行点击事件
          this.ComList['进出港模块-进出港船舶详情列表弹窗'].toggle("show")
        },
        hddtqk_hddwfb_showDialog: function () {  // 航道动态情况模块-航道吨位分布-标题点击事件
          this.ComList['航道动态情况模块-航道吨位分布弹窗'].toggle("show");
          this.ComApi['getGgmhddwfbqk'].call(this).then(res => {
            try {
              let cf = {
                "1万总吨以上": "1",
                "3千-1万总吨": "2",
                "5百-3千总吨": "3",
                "5百总吨以下": "4",
              }
              res.data.rows.forEach(i => {
                i.x = i.areaton;
                i.y = i.cnt;
                i.ind = cf[i.areaton];
                delete i.cnt;
                delete i.areaton
              })
              stage.get(this.ComList['航道动态情况模块-航道吨位分布弹窗-虾峙门饼图'].id).render(res.data.rows.filter(i => i.areaName == '虾峙门').sort((a, b) => a.ind - b.ind))
              stage.get(this.ComList['航道动态情况模块-航道吨位分布弹窗-西堠门大桥饼图'].id).render(res.data.rows.filter(i => i.areaName == '西堠门大桥').sort((a, b) => a.ind - b.ind))
              stage.get(this.ComList['航道动态情况模块-航道吨位分布弹窗-条帚门饼图'].id).render(res.data.rows.filter(i => i.areaName == '条帚门').sort((a, b) => a.ind - b.ind))
              stage.get(this.ComList['航道动态情况模块-航道吨位分布弹窗-双屿门饼图'].id).render(res.data.rows.filter(i => i.areaName == '双屿门').sort((a, b) => a.ind - b.ind))
              stage.get(this.ComList['航道动态情况模块-航道吨位分布弹窗-金塘大桥饼图'].id).render(res.data.rows.filter(i => i.areaName == '金塘大桥').sort((a, b) => a.ind - b.ind))
            } catch (e) {
              console.log("getGgmhddwfbqk接口错误", e)
            }
          })
        },
        jtxlzb_dbcb_label: function (param, isOtherCall) { // 交通效率指标模块-待泊船舶标题点击事件
          if (!isOtherCall) {
            this.ComList['交通效率指标模块-待泊船舶弹窗'].toggle("show");
          }
          let timeDim = this.Store.module_jtlvzb['curDialogTimeDimensionFor待泊船舶']
          let cf = { "year": "anchorNumYear", "month": "anchorNumMonth", "date": "anchorNumDay" };
          this.ComApi['Getgmtdbcbsjdbsc'].call(this).then(res => {
            try {
              let arr = res.data.rows.reduce((t, c, index) => {
                t.push({
                  colorField: index + 1,
                  y: c.name,
                  x: c[cf[timeDim]]
                })
                return t
              }, [])
              stage.get(this.ComList['交通效率指标模块-待泊船舶弹窗-条形图'].id).render(arr)
            } catch (e) {
              console.log("Getgmtdbcbsjdbsc接口错误", e)
            }
          })
        },
        jtxlzb_pjdb_label: function (param, isOtherCall) { // 交通效率指标模块-平均待泊标题点击事件
          if (!isOtherCall) {
            this.ComList['交通效率指标模块-待泊时长弹窗'].toggle("show");
          }
          let timeDim = this.Store.module_jtlvzb['curDialogTimeDimensionFor待泊时长']

          // 柱状图列表
          this.ComApi['Getgmtdbcbsjdbsc'].call(this).then(res => {
            try {
              let cf = { "year": "anchorHourYear", "month": "anchorHourMonth", "date": "anchorHourDay" };
              let arr = res.data.rows.reduce((t, c, index) => {
                t.push({
                  colorField: index + 1,
                  x: c.name,
                  y: c[cf[timeDim]]
                })
                return t
              }, [])
              stage.get(this.ComList['交通效率指标模块-待泊时长弹窗-柱状图'].id).render(arr)
            } catch (e) {
              console.log("Getgmtdbcbsjdbsc接口错误", e)
            }
          })

          // 平均待泊时间
          this.ComApi['Gettwljzxdbsdbsc'].call(this, { dateTimeDt: getCurrentDate() }).then(res => {
            try {
              let cf = { "year": "anchorHourYear", "month": "anchorHourMonth", "date": "anchorHourDay" };  // 给出的单位是分钟
              let value = Math.floor(res.data.rows[0][cf[timeDim]] / 60 / 24)
              stage.get(this.ComList['交通效率指标模块-待泊时长弹窗-平均待泊时长-天'].id).render([{ value }])
              value = res.data.rows[0][cf[timeDim]] / 60 % 24
              stage.get(this.ComList['交通效率指标模块-待泊时长弹窗-平均待泊时长-小时'].id).render([{ value }])
            } catch (e) {
              console.log("Gettwljzxdbsdbsc接口错误", e)
            }
          })

          // 平均待泊时间 增长减少占比
          this.ComApi['Getpjdbsczjdzbfb'].call(this).then(res => {
            try {
              let cf = { "year": "anchorHourYearBfb", "month": "anchorHourMonthBfb", "date": "anchorHourDayBfb" };  // 给出的单位是分钟
              let value = res.data.rows[0][cf[timeDim]];
              let prefix = value.slice(0, 1);
              value = prefix == "+" ? `同比增长:${Number(value.slice(1, -1)).toFixed(2)}%` : `同比降低:${Number(value.slice(1, -1)).toFixed(2)}%`
              stage.get(this.ComList['交通效率指标模块-待泊时长弹窗-平均待泊时长-同比增长降低'].id).render([{ value }])
            } catch (e) {
              console.log("Getpjdbsczjdzbfb接口错误", e)
            }
          })
        },
        jtxlzb_jjhscb_label: function (param) { // 交通效率指标模块-经济航速船舶标题点击事件
          this.ComList['交通效率指标模块-经济航速列表弹窗'].toggle("show");
          this.ComList['交通效率指标模块-经济航速船舶指标对比弹窗'].toggle("show")
          this.ComApi['Getjjhscbqdlb'].call(this, {}).then(res => {
            try {
              stage.get(this.ComList['交通效率指标模块-经济航速列表弹窗-通用标题'].id).render([{ value: `经济航速船舶共 ${res.data.totalNum} 艘` }])
              stage.get(this.ComList['交通效率指标模块-经济航速列表弹窗-船舶列表'].id).render(res.data.rows.map(i => {
                i.preArriveTime_copy = i.preArriveTime
                i.preArriveTime = i.preArriveTime != null ? i.preArriveTime.slice(11,-3) : ""
                return i
              }).slice(0, 100))
            } catch (e) {
              console.log("Getjjhscbqdlb接口错误", e)
            }
          })
          this.ComEvent['jtxlzb_jjhscbzbdb_tab'].call(this, { content: "经济航速总艘次" })
        },
        jtxlzb_sd_dgcqg_apis: function (type) {
          this.ComList[`交通效率指标模块-${type}`].toggle("show");
          let cf = {
            "十大船旗国下钻弹窗": "十大船旗",
            "十大航运企业下钻弹窗": "十大航运"
          }
          this.ComApi['getDnsdhycqqd'].call(this).then(res => {
            try {
              stage.get(this.ComList[`交通效率指标模块-${type}-船舶列表`].id).render(res.data.filter(i => i.type == cf[type]).map((i, index) => {
                i.ind = index + 1;
                return i
              }))
            } catch (e) {
              console.log("getDnsdhycqqd接口错误", e)
            }
          })

        },
        jtxlzb_sd_dgcqg_label: function () {  // 交通效率指标模块-十大-抵港船旗国-标题 点击事件
          this.ComEvent['jtxlzb_sd_dgcqg_apis'].call(this, "十大船旗国下钻弹窗")
        },
        jtxlzb_sd_hyqy_label: function () {  // 交通效率指标模块-十大-航运企业-标题 点击事件
          this.ComEvent['jtxlzb_sd_dgcqg_apis'].call(this, "十大航运企业下钻弹窗")
        },
        jcgmk_tableHeadClick: function () {  // 进出港模块-进出港船舶详情列表弹窗-表头遮罩层 点击事件
          let {date} = this.getCurrentDate()
          // this.ComEvent['jtxlzb_sd_dgcqg_apis'].call(this, "十大航运企业下钻弹窗")
          let lat = 29.74111111111111,
              lng = 122.50888888888889;
          stage.get(this.ComList['基础平面地图-聚焦标注点'].id).show();
          stage.get(this.ComList['基础平面地图-模拟数据的假船'].id).show();
          stage.get(this.ComList['基础平面地图-模拟数据的船舶气泡'].id).show();
          stage.get(this.ComList['基础平面地图-聚焦标注点'].id).render([{ lng, lat}]);
          stage.get(this.ComList['基础平面地图-模拟数据的假船'].id).render([{ lng, lat,
            "enterPortNumber":`虾${date}(48)`,
            "type": "blue",
            "rotationAngle": 299.7,
            "mmsi": "351567000",
            "imo": 9149835,
            "shipNameCn": "挺进STRIDE",
            "nationName": "巴拿马",
            "shipType": "集装箱/",
            "seaRoute": "虾峙门",
            "arrangeLineTime": "21:50:00",
            "arrangeLineTimesss": "23:30:00",
            "pilot": "100 / 13780083100",
            "satellitePhone": 1749910334,
            "berthWharf": "北三集司10"
          }]);
          stage.get(this.ComList['基础平面地图'].id).viewer.map.flyTo([lat, lng], 12);
          this.ComList['进出港模块-进出港船舶详情浮窗'].toggle("show");
          stage.get(this.ComList['进出港模块-进出港船舶详情浮窗-船舶标题'].id).render([{ value: "挺进 STRIDE" }])
          stage.get(this.ComList['进出港模块-进出港船舶详情浮窗-万能表格'].id).render([{
            "key1": "巴拿马",  // 国籍
            "key2":"集装箱船",  // 船舶类型
            "key3": "虾峙门",  // 航道
            "key5": "21:50:00",  // 实际过报告线时间
            "key6": "100",  // 引航员
            "key7": "13780083100",  // 引航员电话
            "key8": "北三集司10",  // 停靠码头
            "key9": "23:30:00",  // 结束/靠泊时间
            "key10": "1749910334",  // 卫星通讯电话
          }])
          stage.get(this.ComList['基础平面地图-模拟数据的船舶气泡'].id).render([{
            "lng":lng,
            "lat": lat,
            "name": `虾${date}(48) 21:50:00` + "</br>"
              + "挺进 STRIDE" + "</br>"
              + "北三集司10 23:30" + "</br>"
              + "引:100(13780083100)" 
          }]);
        },
        jcgmk_jcgcbxxxx: function (e) { // 进出港模块-进出港船舶详情列表弹窗-船舶轮播列表 单点击事件
          this.ComList['进出港模块-进出港船舶详情浮窗'].toggle("show");
          let seaRouteConfig = { 1: "虾峙门", 2: "条帚门", 3: "双屿门", 4: "西猴门", 5: "金塘大桥", 6: "青龙门" }


          this.ComApi['getEnterOuterShipDetails'].call(this, { id: e.id }).then(res => {
            try {
              let da = res.data.rows[0];
              stage.get(this.ComList['进出港模块-进出港船舶详情浮窗-船舶标题'].id).render([{ value: e.shipNameCh }])
              stage.get(this.ComList['进出港模块-进出港船舶详情浮窗-万能表格'].id).render([{
                "key1": da.shipNationality,  // 国籍
                "key2": da.shipTypeName,  // 船舶类型
                "key3": seaRouteConfig[da.seaRoute],  // 航道
                // "key4": da.loadCargo,  // 实际载货
                "key5": da.actualLineTime,  // 实际过报告线时间
                "key6": da.pilots,  // 引航员
                "key7": da.pilotPhone,  // 引航员电话
                "key8": da.berthWharf,  // 停靠码头
                "key9": da.dependBerthTime,  // 结束/靠泊时间
                "key10": da.satellitePhone,  // 卫星通讯电话
              }])
              if (e.mmsi) {
                this.ComApi['getShipInfoByPolygonOrgGet'].call(this, { mmsi: e.mmsi }).then(res => {
                  let da = res.data.rows[0]
                  if (da) {
                    let lnglatArr = this.wgs84togcj02(da.lon, da.lat);
                    stage.get(this.ComList['基础平面地图'].id).viewer.map.flyTo([da.lat, da.lon], 12);
                    stage.get(this.ComList['基础平面地图-聚焦标注点'].id).render([{ lng: da.lon, lat: da.lat }]);
                    stage.get(this.ComList['基础平面地图-聚焦标注点'].id).show();
                  }
                })
              }
            } catch (e) {
              console.log("getEnterOuterShipDetails接口错误", e)
            }
          })
          console.log("进出港模块-进出港船舶详情列表弹窗-船舶轮播列表指定行数据", e)
        },
        jcgmk_shipLoopList_tab: function (e) { // 进出港模块-进出港船舶详情列表弹窗-app业务申报tab按钮点击事件
          if (this.Store.module_jcg.cache_ywsbapp && e[0].txt != this.Store.module_jcg.cache_ywsbap) {
            this.ComList[`进出港模块-${this.Store.module_jcg.cache_ywsbapp}`].toggle("hide", 'autoHide')
          }
          this.Store.module_jcg.cache_ywsbap = e[0].txt;
          this.ComList[`进出港模块-${e[0].txt}`].toggle("show");
        },
        closeCallBack_jcgmk_shipLoopList: function () { // 进出港模块-进出港船舶详情列表弹窗弹窗关闭回调
          this.ComList[`进出港模块-进出港船舶详情浮窗`].toggle("hide");
          this.ComList[`进出港模块-业务申报弹窗`].toggle("hide");
          this.ComList[`进出港模块-APP弹窗`].toggle("hide");
          this.Store.module_jcg.cache_ywsbapp = null;
          this.Store.App_ImgIndex = 0;
          this.Store.ywsb_ImgIndex = 0;

          stage.get(this.ComList['进出港模块-APP弹窗-图片展示'].id).render([{ img: this.Store.App_ImgList[this.Store.App_ImgIndex] }]);
          stage.get(this.ComList['进出港模块-业务申报弹窗-图片展示'].id).render([{ img: this.Store.ywsb_ImgList[this.Store.ywsb_ImgIndex] }]);


          stage.get(this.ComList['进出港模块-进出港船舶详情列表弹窗-app业务申报tab按钮'].id).render([
            { "id": 100, "txt": "业务申报弹窗", "label": "off", "active": false },
            { "id": 200, "txt": "APP弹窗", "label": "on", "active": false }
          ])
        },
        openCallBack_jcgmk_app: function () { // app弹窗显示回调

        },
        closeCallBack_jcgmk_app: function (arg) { // app弹窗关闭回调
          // if(!arg && arg!='autoHide') this.Store.module_jcg.cache_ywsbapp = null;
          this.Store.module_jcg.cache_ywsbapp = null;
        },
        openCallBack_jcgmk_ywsb: function () { // 业务申报弹窗显示回调

        },
        hddtqk_hddt_label: function () { // 航道动态情况模块-航道动态标题 点击事件
          this.ComList['航道动态情况模块-航路预测弹窗'].toggle("show")
        },
        closeCallBack_jcgmk_ywsb: function (arg) { // 业务申报弹窗关闭回调
          this.Store.module_jcg.cache_ywsbapp = null;
        },
        hddtqk_hmtglxz_tabs: function (e) { // 航道动态情况模块-航门通过量下钻弹窗-tab列表 点击事件
          switch (e[0].id) {
            case 100:
              break;
            case 200:
              break;
            case 300:
              this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗'].toggle("show");
              this.ComList['航道动态情况模块-虾改条的船舶清单弹窗'].toggle("show");

              let cf = { "year": "年", "month": "月", "date": "天" };
              let dateType = cf[this.Store.module_hddtqk['curDialogTimeDimensionFor条帚门艘次']];
              let { year, month, date } = this.getCurrentDate()
              this.ComApi['getTsmZscYhl'].call(this, { dateType, dateStr: `${year}-${month}-${date}` }).then(res => {
                try {
                  // stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-总艘次'].id).render([{ value: res.data[0].cnt }]);
                  // stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-货物量'].id).render([{ value: res.data[0].yhl }]);
                  stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-年通过量'].id).render([{ value: res.data.rows[0].yearCnt }]);
                  stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-月通过量'].id).render([{ value: res.data.rows[0].monthCnt }]);
                  stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-日通过量'].id).render([{ value: res.data.rows[0].dayCnt }]);
                } catch (e) {
                  console.log("getTsmZscYhl接口错误", e)
                }
              })

              cf = { "year": "近3年", "month": "近6月" };
              let timeDimension = cf[this.Store.module_hddtqk['curDialogTimeDimensionFor条帚门船舶流量']]
              // this.ComApi['getTsmShipFlow'].call(this, { timeDimension }).then(res => { // 近3年(默认)、近6月
              //   try {
              //     let da = res.data.rows;
              //     stage.get(this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗-船舶流量'].id).render(da.map(i => {
              //       i.x = i.date;
              //       i.y = i.cnt;
              //       return i
              //     }));
              //   } catch (e) {
              //     console.log("getTsmShipFlow接口错误")
              //   }
              // })

              this.ComApi['getXgtqdone'].call(this, {}).then(res => {
                try {
                  if (res.data.rows.length <= 0) {
                    this.ComApi['getXgtqdtwo'].call(this, {}).then(ress => {
                      try {
                        stage.get(this.ComList['航道动态情况模块-虾改条的船舶清单弹窗-船舶列表'].id).render(ress.data.rows.map(i => {
                          i.reportLineTime = i.reportLineTime != null ? i.reportLineTime.slice(5) : ""
                          return i
                        }).slice(0, 2));
                        stage.get(this.ComList['航道动态情况模块-虾改条的船舶清单弹窗-标题'].id).render([{ value: `今日虾改条清单（共计2条）` }]);
                      } catch (e) {
                        console.log("getXgtqdtwo接口错误")
                      }
                    })
                  } else {
                    stage.get(this.ComList['航道动态情况模块-虾改条的船舶清单弹窗-船舶列表'].id).render(res.data.rows.map(i => {
                      i.reportLineTime = i.reportLineTime != null ? i.reportLineTime.slice(5) : ""
                      return i
                    }));
                    stage.get(this.ComList['航道动态情况模块-虾改条的船舶清单弹窗-标题'].id).render([{ value: `今日虾改条清单（共计${res.data.rows.length}条）` }]);
                  }
                } catch (e) {
                  console.log("getXgtqdone接口错误")
                }
              })
              break;
          }
        },
        closeCallBack_hddtqk_hmtglxz: function (e) { // 航道动态情况模块-航门通过量下钻弹窗 关闭回调事件
          this.ComList['航道动态情况模块-条帚门航道能力下钻弹窗'].toggle("hide")
          this.ComList['航道动态情况模块-虾改条的船舶清单弹窗'].toggle("hide");
        },
        // mapClickRoadstead_Ship: function (e) { // 基础平面地图-锚地动态-船舶点位 船舶点击事件
        //   console.log("锚地动态船舶点位", e)
        // },
        ccdu_ShipLoopList: function (e) { // 生产调度模块-船舶轮播列表 表头点击事件
          this.ComList['生产调度模块-船舶详情列表弹窗'].toggle("show")
        },
        scdd_shipDetail: function (e) { // 生产调度模块-船舶轮播列表 单行点击事件
          this.ComEvent['get_shipDetail'].call(this, e.vesselMmsi)
        },
        yhtlzy_shipDetail: function (e) { // 引航/拖轮作业模块-船舶轮播列表 单行点击事件
          this.ComEvent['get_shipDetail'].call(this, e.mmsi)
        },
        hxzbmk_hideBtn: function (e) { // 核心指标模块隐藏按钮 点击事件
          this.ComList['核心指标-指标合集组'].toggle("hide")
          stage.get(this.ComList['核心指标模块-显示按钮'].id).show()
        },
        hxzbmk_showBtn: function (e) { // 核心指标模块显示按钮 点击事件
          this.ComList['核心指标-指标合集组'].toggle("show")
          stage.get(this.ComList['核心指标模块-显示按钮'].id).hide()
        },
        yhtlzy_ShipLoopList1: function (e) { // 引航/拖轮作业模块-船舶轮播列表 表头点击事件
          this.ComList['引航拖轮作业模块-船舶详情列表'].toggle("show")
        },
        jtxlzb_ShipLoopList: function (e) { // 交通效率指标模块-经济航速列表弹窗-船舶列表 单行点击事件
          this.ComList['交通效率指标模块-经济航速船详细弹窗'].toggle("show")
          // this.ComEvent['get_shipDetail'].call(this, e.mmsi);
          stage.get(this.ComList['交通效率指标模块-经济航速船详细弹窗-万能表格'].id).render([{
            "key1": e.shipName,
            "key2": "(节约燃油量=使用最大航速油耗-使用经济航速实际油耗):" + e.reduceFuelMeter + (e.reduceFuelMeter ? " 吨" : ""),
            "key3": e.reduceWaitHour + (e.reduceFuelMeter ? " 小时" : ""),
            "key4": e.shipCompany,
            "key5": e.line,
            "key6": e.preArriveTime_copy, 
            "key7": e.lastDistance + (e.reduceFuelMeter ? " 海里" : ""),
            "key8": e.reduceCarbonEmission,
            "key9": e.reduceMoney + (e.reduceFuelMeter ? " 美元" : ""),
            "key10": e.createTime,
            "key11": e.lastPort,
            "key12": e.wharf,
          }])
        },
        jtxlzb_jjhscbzbdb_tab: function (e) { // 交通效率指标模块-经济航速船舶指标对比弹窗-tab列表 tab点击事件
          this.Store.module_jtlvzb['tabStausFor经济航速船舶指标对比'] = e.content;

          this.ComApi['Gettwljzxdbsdbsc'].call(this, { dateTimeDt: getCurrentDate() }).then(res => {
            let config = {
              "经济航速总艘次": "economicSpeedShipYear",
              "减少碳排放": "carbonEmissionYear",
              "减少燃油消耗": "fuelMeterYear",
              "减少燃油成本": "reduceMoneyYear",
              "减少船舶待泊时间": "8539.72"
            }

            let moni = {
              "经济航速总艘次": {
                "2019": "1511",
                "2020": "2032",
                "2021": "4048",
              },
              "减少碳排放": {
                "2019": "69", // 69991
                "2020": "73", // 73558
                "2021": "75" // 75333
              },
              "减少燃油消耗": {
                "2019": "82", // 82917
                "2020": "81", // 87113
                "2021": "89"  // 89370
              },
              "减少船舶待泊时间": {
                "2019": "23614", // 23614
                "2020": "28075", // 28075
                "2021": "34629"  // 34629
              },
              "减少燃油成本": {
                "2019": "3895.4", // 38954127
                "2020": "4068.8", // 40688255
                "2021": "8264.6"  // 82646174
              },
              "节约燃油量(3年船均)": "34.41吨",
              "待港时间减少(3年船均)": "22.96小时",
              "燃油成本减少(3年船均)": "14569.21美元",
              "碳排放减少(3年船均)": "29吨"
            }

            // 翻牌器单位
            let suffixCF2 = {
              "经济航速总艘次": "艘次",
              "减少碳排放": "吨",
              "减少燃油消耗": "吨",
              "减少船舶待泊时间": "小时",
              "减少燃油成本": "美元",
            }
            // 柱状图单位
            let suffixCF = {
              "经济航速总艘次": "艘次",
              "减少碳排放": "万吨",
              "减少燃油消耗": "万吨",
              "减少船舶待泊时间": "小时",
              "减少燃油成本": "万美元",
            }

            let arr = [];
            let num1 = 0;
            for (let i in moni[e.content]) {
              arr.push({
                "colorField": "100",
                x: i,
                y: moni[e.content][i]
              })
              num1 += Number(moni[e.content][i])
            }
            stage.get('main-title_gSjhv').render([{ value: e.content }])  // 
            stage.get('bar-basic_PmOQR').render(arr)  // 折线图


            let bnlj = null
            if(e.content=='减少燃油成本'){
              bnlj = res.data.rows[0][config[e.content]]/10000
            }else if(e.content=='减少碳排放' || e.content=='减少燃油消耗'){
              bnlj = res.data.rows[0][config[e.content]]/10000
            }else if(e.content=='减少船舶待泊时间'){
              bnlj = 8539
            }else {
              bnlj = res.data.rows[0][config[e.content]]
            }


            stage.get('number-title-flop_16PL9').render([{
              name: "本年船均",
              value: (res.data.rows[0][config[e.content]] || 8539.72) / (res.data.rows[0][config['经济航速总艘次']]),
              suffix: suffixCF2[e.content]
            }])

            stage.get('number-title-flop_VB5uo').render([{
              name: "本年累计",
              value: res.data.rows[0][config[e.content]] || 8539.72,
              suffix: suffixCF2[e.content]
            }])
            stage.get('main-title_aPw5T').render([{ value: `单位:${suffixCF[e.content]}` }])

            e.content == '经济航速总艘次' ? stage.get('number-title-flop_16PL9').hide() : stage.get('number-title-flop_16PL9').show()
          })
        },
        jtxlzb_dbsctc_tab: function (e) {   // 交通效率指标模块-待泊时长弹窗-tab列表 时间维度切换
          this.Store.module_jtlvzb['curDialogTimeDimensionFor待泊时长'] = e.type;
          this.ComEvent['jtxlzb_pjdb_label'].call(this, null, true)
        },
        jtxlzb_dbcbtc_tab: function (e) {   // 交通效率指标模块-待泊船舶弹窗-tab列表 时间维度切换
          this.Store.module_jtlvzb['curDialogTimeDimensionFor待泊船舶'] = e.type;
          this.ComEvent['jtxlzb_dbcb_label'].call(this, null, true)
        },
        closeCallBack_jtxlzb_jjhslb: function (e) { // 交通效率指标模块-经济航速列表弹窗弹窗 关闭回调
          this.ComList['交通效率指标模块-经济航速船列表弹窗'].toggle("hide")
          this.ComList['交通效率指标模块-经济航速船舶指标对比弹窗'].toggle("hide")
        },
        jcgmk_apptc_prevBtn: function (e) {
          this.Store.App_ImgIndex--;
          if (this.Store.App_ImgIndex < 0) {
            this.Store.App_ImgIndex = this.Store.App_ImgList.length - 1;
          }
          stage.get(this.ComList['进出港模块-APP弹窗-图片展示'].id).render([{ img: this.Store.App_ImgList[this.Store.App_ImgIndex] }])
        },
        jcgmk_apptc_nextBtn: function (e) {
          this.Store.App_ImgIndex++;
          if (this.Store.App_ImgIndex >= this.Store.App_ImgList.length) {
            this.Store.App_ImgIndex = 0;
          }
          stage.get(this.ComList['进出港模块-APP弹窗-图片展示'].id).render([{ img: this.Store.App_ImgList[this.Store.App_ImgIndex] }])
        },
        jcgmk_ywsbtc_prevBtn: function (e) {
          this.Store.ywsb_ImgIndex--;
          if (this.Store.ywsb_ImgIndex < 0) {
            this.Store.ywsb_ImgIndex = this.Store.ywsb_ImgList.length - 1
          }
          stage.get(this.ComList['进出港模块-业务申报弹窗-图片展示'].id).render([{ img: this.Store.ywsb_ImgList[this.Store.ywsb_ImgIndex] }])
        },
        jcgmk_ywsbtc_nextBtn: function (e) {
          this.Store.ywsb_ImgIndex++;
          if (this.Store.ywsb_ImgIndex >= this.Store.ywsb_ImgList.length) {
            this.Store.ywsb_ImgIndex = 0;
          }
          stage.get(this.ComList['进出港模块-业务申报弹窗-图片展示'].id).render([{ img: this.Store.ywsb_ImgList[this.Store.ywsb_ImgIndex] }])
        },
        mddtqk_mdssdtlb_yuyue_cellClick: function (e) {
          this.ComList['锚地动态情况模块-预约情况下钻弹窗'].toggle('show')
        },
        mddtqk_mdssdtlb_cellClick: function (e) {  // 锚地动态情况模块-锚地实时动态列表 单列点击事件
          stage.get(this.ComList['基础平面地图-锚地动态-所有锚地'].id).show();
          this.ComEvent['mapClickRoadstead'].call(this, { name: e.elementNameCn, other: e });
          this.ComApi['getmdsj'].call(this, { type: e.elementNameCn }).then(res => {
            try {
              let da = res.data.rows[0];
              if (da && da.geom) {
                lnglatArr = this.filter_POLYGON(da.geom);
                stage.get(this.ComList['基础平面地图'].id).viewer.map.flyTo([lnglatArr[0][0][1], lnglatArr[0][0][0]], 12);
              }
            } catch (e) {
              console.log("getmdsj接口错误", e)
            }
          })
        },
        mddtqk_bsymddtjz_label: function (e) {
          this.ComList['锚地动态情况模块-保税油加注今日计划弹窗'].toggle('show');
          this.ComApi['getJyjhqdlb'].call(this).then(res => {
            try {
              stage.get(this.ComList['锚地动态情况模块-保税油加注今日计划弹窗-船舶列表'].id).render(res.data.rows.map(i => {
                i.stcTime = i.stcTime != null ? i.stcTime.slice(5,-9) : ""
                return i
              }))
            } catch (e) {
              console.log("getJyjhqdlb接口错误", e)
            }
          })
        },


        jcgmk_hmjcgtc_xzm: function () {
          this.ComEvent['jcgmk_hmjcgtc_hmhj'].call(this, "虾峙门")
        },
        jcgmk_hmjcgtc_jtdq: function () {
          this.ComEvent['jcgmk_hmjcgtc_hmhj'].call(this, "金塘大桥")
        },
        jcgmk_hmjcgtc_xhmdq: function () {
          this.ComEvent['jcgmk_hmjcgtc_hmhj'].call(this, "西堠门大桥")
        },
        jcgmk_hmjcgtc_sym: function () {
          this.ComEvent['jcgmk_hmjcgtc_hmhj'].call(this, "双屿门")
        },
        jcgmk_hmjcgtc_tzm: function () {
          this.ComEvent['jcgmk_hmjcgtc_hmhj'].call(this, "条帚门")
        },
        jcgmk_hmjcgtc_hmhj: function (name) {  // 五个航门点击事件合集
          let cf = {
            "虾峙门": 1,
            "条帚门": 2,
            "双屿门": 3,
            "西猴门": 4,
            "金塘大桥": 5,
            "青龙门": 6
          }
          let enterOut = this.Store.module_jcgyit['enterOut']
          this.ComList['进出港模块-航门进出港下钻弹窗'].toggle("show")
          stage.get(this.ComList['进出港模块-航门进出港下钻弹窗-标题'].id).render([{ value: `${name}${enterOut}港船舶详情` }])
          this.ComApi['getEnterOuterShipList'].call(this, { dateType: "当日", seaRoute: cf[name], enterOut }).then(res => {
            try {
              stage.get(this.ComList['进出港模块-航门进出港下钻弹窗-船舶列表'].id).render(res.data.rows.map(i => {
                let seaRouteConfig = { 1: "虾峙门", 2: "条帚门", 3: "双屿门", 4: "西猴门", 5: "金塘大桥", 6: "青龙门" }
                let dataSourceConfig = { 1: "宁波港调度", 2: "舟山引航站", 3: "外网申请", 4: "舟山港务局" }
                let eventStatusConfig = { 4: "正常", 6: "待定" }
                let str = ''
                if (i.towBoatInfoJsons) {
                  JSON.parse(i.towBoatInfoJsons).forEach(type => {
                    if (type.OP_NAME != '其他') {
                      type.TUGS.forEach(ship => {
                        str += ship.NAME + ":" + ship.OP_NAME + ","
                      })
                    }
                  })
                }
                i.seaRoute = seaRouteConfig[i.seaRoute];
                i.dataSource = dataSourceConfig[i.dataSource];
                i.__towBoatInfoJsons = str ? str.slice(0, -1) : "-";
                i.__eventStatus = eventStatusConfig[i.eventStatus];
                i.pilots = i.pilots || "自引";
                i._arrangeLineTime = i.arrangeLineTime != null ? i.arrangeLineTime.slice(5) : ""
                i._zuoyejieshushijian = i.zuoyejieshushijian != null ? i.zuoyejieshushijian.slice(5) : ""
                return i
              }))
            } catch (e) {
              console.log("getEnterOuterShipList 接口错误,五个航门下转", e)
            }
          })
        },
        jcgmk_hmjcgxztc_shipLoop: function (e) {
          this.ComEvent['get_shipDetail'].call(this, e.mmsi)
        },
        jtxlzbmk_zhjg: function (e) {
          // console.log(666666666)
          this.ComList['交通效率指标模块-直航进港下钻弹窗'].toggle("show");
        },
        mddtmk_mdxzqctc: function () {
          this.ComList['锚地动态情况模块-保税油下钻弹窗'].toggle("show");
          this.ComApi['Getjzlzjsc_jbsy'].call(this, { dateType: "年" }).then(res => {
            try {
              stage.get(this.ComList['锚地动态情况模块-保税油下钻弹窗-历年保税油加注船舶列表'].id).render(res.data.rows.filter(i => i.gyl)
                .sort((a, b) => b.gyl - a.gyl).map((i, index) => {
                  i.time = i.time + "年"
                  i.gyl = parseFloat((i.gyl / 10000)).toFixed(2).toLocaleString() + "万吨"
                  return i
                }))
            } catch (e) {
              console.log("Getjzlzjsc_jbsy 接口错误", e)
            }
          })
          this.ComApi['GetGmdbngylfb'].call(this, {}).then(res => {
            try {
              let total = 0;
              res.data.rows.forEach(i => total = total + Number(i.gyl))
              stage.get(this.ComList['锚地动态情况模块-保税油下钻弹窗-本年度各锚地加注船舶列表'].id).render(res.data.rows.filter(i => Math.floor(i.gyl / 1000) > 0 ? true : false)
                .sort((a, b) => b.gyl - a.gyl).map((i, index) => {
                  i.time = i.time + "年"
                  i.per = (Number(i.gyl / total) * 100).toFixed(2) + "%"
                  i.gyl = parseFloat((i.gyl / 10000)).toFixed(2).toLocaleString() + "万吨";
                  return i
                }))
            } catch (e) {
              console.log("GetGmdbngylfb 接口错误", e)
            }
          })
        },
      },
      // api接口列表
      ComApi: {
        // 进出港船舶数量
        getEnterOuterShipCount: function (params) {
          return new Promise((resolve, reject) => this.request("/opt/getEnterOuterShipCount", params).then(res => resolve(res)))
        },
        // 进出港船舶清单列表
        getEnterOuterShipList: function (params) {
          return new Promise((resolve, reject) => this.request("/opt/getEnterOuterShipList", params).then(res => resolve(res)))
        },
        // 今日抛锚量
        // getJrpml: function (params) {
        //   return new Promise((resolve, reject) => this.request("/bas/vel/getJrpml", params).then(res => resolve(res)))
        // },
        // 所有/指定 锚地数据
        getmdsj: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getmdsj", params).then(res => resolve(res)))
        },
        // 指定锚地下转的船舶清单列表
        getMdmbjh: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getMdmbjh", params).then(res => resolve(res)))
        },
        // 条帚门总艘次、货运量
        getTsmZscYhl: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getTsmZscYhl", params).then(res => resolve(res)))
        },
        // 条帚门航道的船舶流量
        getTsmShipFlow: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getTsmShipFlow", params).then(res => resolve(res)))
        },
        // 进出港 指定船舶详细信息
        getEnterOuterShipDetails: function (params) {
          return new Promise((resolve, reject) => this.request("/opt/getEnterOuterShipDetails", params).then(res => resolve(res)))
        },
        // 保税油锚地加注状态
        GetBsymdjzzt: function (params) {
          return new Promise((resolve, reject) => this.request("/zxdp/GetBsymdjzzt", params).then(res => resolve(res)))
        },
        // 各个锚地的本年供油量分布
        GetGmdbngylfb: function (params) {
          return new Promise((resolve, reject) => this.request("/zxdp/GetGmdbngylfb", params).then(res => resolve(res)))
        },
        // 当前在港重点物资运输列表
        getZgzdwzyslb: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getZgzdwzyslb", params).then(res => resolve(res)))
        },
        // 各个锚地实时动态 (列表)
        Ggmdssdt: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/Ggmdssdt", params).then(res => resolve(res)))
        },
        // 供油量、作业艘次 (加保税油的)  年、月、日   （4年、6个月、15天）
        Getjzlzjsc_jbsy: function (params) {
          return new Promise((resolve, reject) => this.request("/zxdp/Getjzlzjsc_jbsy", params).then(res => resolve(res)))
        },
        // 当前抛锚船数量、锚位总数
        getDqpmsmws: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getDqpmsmws", params).then(res => resolve(res)))
        },
        // 虾改条的船舶清单
        // getTsmShipList: function (params) {
        //   return new Promise((resolve, reject) => this.request("/bas/vel/getTsmShipList", params).then(res => resolve(res)))
        // },
        getXgtqdone: function (params) {  // 有数据取这个
          return new Promise((resolve, reject) => this.request("/bas/vel/getXgtqdone", params).then(res => resolve(res)))
        },
        getXgtqdtwo: function (params) {  // 上一个没数据 取这个 取前两条
          return new Promise((resolve, reject) => this.request("/bas/vel/getXgtqdtwo", params).then(res => resolve(res)))
        },
        // 指定重点物资船舶点位
        getZgzdwzyscbqd_polygon: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getZgzdwzyscbqd_polygon", params).then(res => resolve(res)))
        },
        // 各个门今日通过量
        getGgmjrtgl: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getGgmjrtgl", params).then(res => resolve(res)))
        },
        // 各个门航线数据
        getHmsj: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getHmsj", params).then(res => resolve(res)))
        },
        // 各个门今日通过量的船舶清单列表
        getGgmjrtglcbqd: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getGgmjrtglcbqd", params).then(res => resolve(res)))
        },
        // 航道吨位分布-各个门航道吨位分布情况
        getGgmhddwfbqk: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getGgmhddwfbqk", params).then(res => resolve(res)))
        },
        // 当前在港重点物资运输船舶(在港煤炭船、LNG、原油、粮食、铁矿)
        getDqzgzdwzyccbshws: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getDqzgzdwzyccbshws", params).then(res => resolve(res)))
        },
        // 码头点位
        getMtdw: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getMtdw", params).then(res => resolve(res)))
        },
        // 宁波/舟山港船舶列表(生产调度一体化)
        getNbzsgcblb: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getNbzsgcblb", params).then(res => resolve(res)))
        },
        // 宁波/舟山港船舶列表(引航拖轮一体化)
        getYhtlnbzsgcblb: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getYhtlnbzsgcblb", params).then(res => resolve(res)))
        },
        // 今日引航安排数、今日拖轮数
        Getyhshtls: function (params) {
          return new Promise((resolve, reject) => this.request("/zxdp/Getyhshtls", params).then(res => resolve(res)))
        },
        // 虾峙门航道准点进港  当年、月、日
        GetXzmhdzdljg: function (params) {
          return new Promise((resolve, reject) => this.request("/zxdp/GetXzmhdzdljg", params).then(res => resolve(res)))
        },
        // 年度货物吞吐量、集装箱量
        Gettwljzxdbsdbsc: function (params) {
          return new Promise((resolve, reject) => this.request("/zxdp/Gettwljzxdbsdbsc", params).then(res => resolve(res)))
        },
        // 平均待泊时长
        Getpjdbsczjdzbfb: function (params) {
          return new Promise((resolve, reject) => this.request("/zxdp/Getpjdbsczjdzbfb", params).then(res => resolve(res)))
        },
        // 在港船舶总数
        getZgcbzs: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getZgcbzs", params).then(res => resolve(res)))
        },
        // 当年10大航运、10大船旗国信息
        getDnsdhycqqd: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getDnsdhycqqd", params).then(res => resolve(res)))
        },
        // 加油计划清单列表(保税油加注今日计划)
        getJyjhqdlb: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getJyjhqdlb", params).then(res => resolve(res)))
        },
        // 各个码头待泊船舶数及待泊时长
        Getgmtdbcbsjdbsc: function (params) {
          return new Promise((resolve, reject) => this.request("/zxdp/Getgmtdbcbsjdbsc", params).then(res => resolve(res)))
        },
        // 进出港航门船舶数量
        getCblbtoHmsl: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getCblbtoHmsl", params).then(res => resolve(res)))
        },
        // 当前在港重点物资运输船舶---清单列表   指定物资下转船舶清单
        getZgzdwzyscbqd: function (params) {
          return new Promise((resolve, reject) => this.request("/bas/vel/getZgzdwzyscbqd", params).then(res => resolve(res)))
        },
        // 经济航速船舶清单列表
        Getjjhscbqdlb: function (params) {
          return new Promise((resolve, reject) => this.request("/zxdp/Getjjhscbqdlb", params).then(res => resolve(res)))
        },
        // 直航进港
        dwd_ma_opt_direct_entry_port_df: function (params) {
          return new Promise((resolve, reject) => this.request("/opt/dwd_ma_opt_direct_entry_port_df", params).then(res => resolve(res)))
        },
        // 商渔船点位-(优化字段版)
        getShipInfoByPolygonOrgGet: function (params) {
          // return new Promise((resolve, reject) => this.request("/bas/vel/ads/getShipInfoByPolygonOrgGet", params,{ type: "post" }).then(res => resolve(res)))
          let _param = {
            isFish: 1,
            voildMin:30,
            pageSize: 10000,
            pageNum: 1,
            mmsi:params.mmsi
          }
          let str = '';
          for (let i in _param) str += `${i}=${_param[i]}&`;
          // return new Promise((resolve, reject) => this.request("/bas/vel/ads/getShipInfoByPolygonOrg?" + str, {}, { type: "post" }).then(res => resolve(res)))
          return new Promise((resolve, reject) => this.request("/bas/vel/ads/getShipInfoByPolygonOrgGet?" + str.slice(0,-1), {}, { type: "post" }).then(res => resolve(res)))
        },
        // 新气泡数据
        dwd_trafficflow_apply_enter_out_port_df_bubble: function (params) {
          return new Promise((resolve, reject) => this.request("/opt/dwd_trafficflow_apply_enter_out_port_df_bubble", params).then(res => resolve(res)))
        },
        // 商渔船点位-气泡数据 
        // dwd_trafficflow_apply_enter_out_port_df: function (params) {
        //   return new Promise((resolve, reject) => this.request("/opt/dwd_trafficflow_apply_enter_out_port_df", params).then(res => resolve(res)))
        // },
        // 商渔船点位
        getShipInfoByPolygonOrg: function (pageNum = 1) {
          let D = new Date();
          let positionTimeEnd =
            `${D.getFullYear()}-${D.getMonth() + 1 >= 10 ? D.getMonth() + 1 : "0" + (D.getMonth() + 1)}-${D.getDate() >= 10 ? D.getDate() : "0" + D.getDate()} ${D.getHours() >= 10 ? D.getHours() : "0" + D.getHours()}:${D.getMinutes() >= 10 ? D.getMinutes() : "0" + D.getMinutes()}:00`;
          let chazhi = new Date(D.getTime() - 1000 * 60 * 30);
          D = new Date(chazhi);
          let positionTimeStart =
            `${D.getFullYear()}-${D.getMonth() + 1 >= 10 ? D.getMonth() + 1 : "0" + (D.getMonth() + 1)}-${D.getDate() >= 10 ? D.getDate() : "0" + D.getDate()} ${D.getHours() >= 10 ? D.getHours() : "0" + D.getHours()}:${D.getMinutes() >= 10 ? D.getMinutes() : "0" + D.getMinutes()}:00`;
          let _param = {
            polygon: `polygon((121.52801513671875 30.153439766137296,121.94549560546878 30.320729603695973,122.38494873046878 29.896615075309757,122.38220214843753 29.847790904477122,122.65823364257814 29.794175906436582,122.64862060546875 29.506549442788593,122.0855712890625 29.507744610083193,121.84387207031251 29.71787396585316,121.52732849121094 30.15581466111752))`,
            isFish: 1,
            positionTimeStart,
            // voildMin:30,
            pageSize: 10000,
            pageNum: pageNum
          }
          let str = '';
          for (let i in _param) str += `${i}=${_param[i]}&`;
          // return new Promise((resolve, reject) => this.request("/bas/vel/ads/getShipInfoByPolygonOrg?" + str, {}, { type: "post" }).then(res => resolve(res)))
          return new Promise((resolve, reject) => this.request("/bas/vel/ads/getShipInfoByPolygonOrgGet?" + str, {}, { type: "post" }).then(res => resolve(res)))
        },
      },
      Script: function () {
        let { year, month, date } = this.getCurrentDate()


        //  模块背景炫光设置  （内外网）
        stage.get(this.ComList['模块炫光-进出港一体化'].id).render([{ img:this.Store._static[1]}])
        stage.get(this.ComList['模块炫光-生产调度一体化'].id).render([{ img:this.Store._static[1]}])
        stage.get(this.ComList['模块炫光-引航拖轮一体化'].id).render([{ img:this.Store._static[1]}])
        stage.get(this.ComList['模块炫光-交通效率指标'].id).render([{ img:this.Store._static[2]}])
        stage.get(this.ComList['模块炫光-航道动态'].id).render([{ img:this.Store._static[1]}])
        stage.get(this.ComList['模块炫光-锚地动态'].id).render([{ img:this.Store._static[1]}])
        stage.get(this.ComList['模块炫光-重点物资运输'].id).render([{ img:this.Store._static[1]}])
        stage.get(this.ComList['模块炫光-top背景'].id).render([{ img:this.Store._static[0]}])

        // 航路预测url设置  (内外网)
        stage.get(this.ComList['外链url-航路预测'].id).render([{ url:this.Store._static[3]}])

        // 核心指标模块日期
        stage.get(this.ComList['核心指标模块-年度集装箱量(年)'].id).render([{ value: year + "年" }])
        stage.get(this.ComList['核心指标模块-年度集装箱量(月)'].id).render([{ value: month + "月" }])
        stage.get(this.ComList['核心指标模块-年度集装箱量(日)'].id).render([{ value: date + "日" }])







        // 模块展示自动轮播   锚地饼图、柱状图
        // let lbmk_mddtqk_prevPointer = 1;
        // let lbmk_mddtqk_nestPointer = 0;
        // let lbmk_mddtqk_loopList = ['轮播模块-锚地动态情况-饼图轮播1', '轮播模块-锚地动态情况-柱状轮播2'];
        // let run1 = () => {
        //   this.ComList[`${lbmk_mddtqk_loopList[lbmk_mddtqk_prevPointer]}`].toggle("hide");
        //   this.ComList[`${lbmk_mddtqk_loopList[lbmk_mddtqk_nestPointer]}`].toggle("show");
        //   lbmk_mddtqk_prevPointer = lbmk_mddtqk_nestPointer;
        //   lbmk_mddtqk_nestPointer++
        //   if (lbmk_mddtqk_nestPointer >= lbmk_mddtqk_loopList.length) lbmk_mddtqk_nestPointer = 0
        // }
        // run1(); 
        // setInterval(run1, 1000 * 15);







        // 模块展示自动轮播   10大航运企业  10大船旗国   5个 5个轮播
        let lbmk_sdhyqy_prevPointer = 1;
        let lbmk_sdhyqy_nestPointer = 0;
        let lbmk_sdhyqy_loopList = ['轮播模块-船旗航运-轮播1', '轮播模块-船旗航运-轮播2'];
        let run2 = () => {
          this.ComList[`${lbmk_sdhyqy_loopList[lbmk_sdhyqy_prevPointer]}`].toggle("hide");
          this.ComList[`${lbmk_sdhyqy_loopList[lbmk_sdhyqy_nestPointer]}`].toggle("show");
          lbmk_sdhyqy_prevPointer = lbmk_sdhyqy_nestPointer;
          lbmk_sdhyqy_nestPointer++
          if (lbmk_sdhyqy_nestPointer >= lbmk_sdhyqy_loopList.length) lbmk_sdhyqy_nestPointer = 0
        }
        run2();
        setInterval(run2, 1000 * 15);










        let run3 = () => {
          let seaRouteConfig = { 1: "虾峙门", 2: "条帚门", 3: "双屿门", 4: "西猴门", 5: "金塘大桥", 6: "青龙门" }
          this.ComApi['getShipInfoByPolygonOrg'].call(this).then(res => {
            // 具体映射表找应用测
            let ColorMap = {
              // 危险品船 (油船、化工船、LPG、LNG)
              "red": ['0307', '0302', '0303', '0504', '0301', '0306', '0304', '0300'],
              // 其他商船
              "blue": [],
              // 公务船、拖轮、引航艇、客船
              "green": ['0111', '0103', '0109', '0100', '0102', '0107', '0105', '0101', '0212', '0108', '0110', '0104', '0112', '0106', '0905', '0903',
                '0600', '0601', '0602'
              ]
            }
            let returnType = (code, speed) => {
              // “节”是一个航海术语，航海速度单位。1节表示的是1小时航行1海里，1海里是1.852千米。也就是每小时船航行1.852千米，叫一节。换算成米每秒为0.514米/秒。
              let sp = speed / 0.514 > 2.5 ? "" : "1"
              for (let i in ColorMap) {
                if (ColorMap[i].findIndex(ii => ii == code) != -1) {
                  return i + sp
                }
              }
              return "blue" + sp
            }

            let runArr = [];
            let totalNum = res.data.totalNum;
            let totalPage = Math.ceil(totalNum / res.data.pageSize);
            for (let i = 2; i <= totalPage; i++) runArr.push(this.ComApi['getShipInfoByPolygonOrg'].call(this, i))
            Promise.all(runArr).then(resss => {
              // console.log("===",resss)
              // console.log("===res",res)
              resss.forEach(i => res.data.rows.push(i.data.rows))
              if(resss.length>0){
                res.data.rows.flat()   // 商渔船点位数据
              }


              // 气泡数据
              this.ComApi['dwd_trafficflow_apply_enter_out_port_df_bubble'].call(this).then(bubbleInfo => {

                let bubbleList = [];
                let dotList = []

                res.data.rows.forEach(i => {
                  if (i && i.lon && i.lat) {
                    // let lnglatArr = [i.lon, i.lat];
                    let flag = false


                    bubbleInfo.data.rows.forEach(bubble => {
                      if (bubble.mmsi == i.mmsi && bubble.enterPortNumber) {
                        flag = true
                        bubbleList.push({
                          "lng": i.lon,
                          "lat": i.lat,
                          "name": (bubble.enterPortNumber || " ") + "  " + (bubble.arrangeLineTime != null ? bubble.arrangeLineTime.slice(11) : "" || " ") + "</br>"
                            + ((bubble.shipNameCh + "</br>") || "")
                            + (bubble.berthWharf || "") + (bubble.dependBerthTime != null ? bubble.dependBerthTime.slice(11) : "") + (bubble.berthWharf || bubble.dependBerthTime || "") + ((bubble.berthWharf || bubble.dependBerthTime || "")?"</br>":"")
                            + "引: " + (bubble.pilots || " ")
                        })
                        i.enterPortNumber = bubble.enterPortNumber
                        i.shipType = bubble.shipType || " "
                        i.seaRoute = seaRouteConfig[bubble.seaRoute] || " "
                        i.arrangeLineTime = bubble.arrangeLineTime || " "
                        i.loadCargo = bubble.loadCargo || " "
                        i.pilot = ((bubble.pilotPhone || "") + " ") + (bubble.pilots || " ")
                        i.berthWharf = bubble.berthWharf || " "
                        i.arrangeLineTime = bubble.arrangeLineTime || " "
                        i.satellitePhone = bubble.satellitePhone || " "




                        // i.info = "进港编号:" + (bubble.enterPortNumber || " ") + "</br>"
                        //   + "mmsi:" + (i.mmsi || " ") + "</br>"
                        //   + "imo:" + (i.imo || " ") + "</br>"
                        //   + "船名:" + (i.shipNameCn || " ") + "</br>"
                        //   + "国籍:" + (i.nationName || " ") + "</br>"
                        //   + "船舶类型:" + (bubble.shipType || " ") + "</br>"
                        //   + "航道:" + (seaRouteConfig[bubble.seaRoute] || " ") + "</br>"
                        //   + "预计进港时间:" + (bubble.arrangeLineTime || " ") + "</br>"
                        //   + "载货:" + (bubble.loadCargo || " ") + "</br>"
                        //   + "引航员、电话:" + (i.pilotPhone || " ") + (bubble.pilots || " ") + "</br>"
                        //   + "码头:" + (bubble.berthWharf || " ") + "</br>"
                        //   + "拟靠泊时间:" + (bubble.arrangeLineTime || " ") + "</br>"
                        //   + "卫星电话:" + (bubble.satellitePhone || " ") + "</br>"
                      }
                    })



                    let opt = {
                      "lng": i.lon,
                      "lat": i.lat,
                      type: returnType(i.shipTypeCode, i.speed),
                      rotationAngle: i.direction,
                    }
                    if (flag) {
                      opt = Object.assign(opt, {
                        enterPortNumber: i.enterPortNumber || " ",
                        mmsi: i.mmsi || " ",
                        imo: i.imo || " ",
                        shipNameCn: i.shipNameCn || " ",
                        nationName: i.nationName || " ",
                        shipType: i.shipType || " ",
                        seaRoute: i.seaRoute || " ",
                        arrangeLineTime: i.arrangeLineTime || " ",
                        pilot: i.pilot,
                        berthWharf: i.berthWharf || " ",
                        arrangeLineTimesss: i.arrangeLineTimesss || " ",
                        satellitePhone: i.satellitePhone || " ",
                        loadCargo: i.loadCargo || " "

                      })
                    }
                    dotList.push(opt)

                  }

                });

                // console.log("===气泡数据", JSON.stringify(bubbleList))
                // console.log("===点位数据",JSON.stringify(dotList))
                stage.get(this.ComList['基础平面地图-地图上的船舶点位'].id).show();
                stage.get(this.ComList['基础平面地图-地图上的船舶点位'].id).render(dotList)
                stage.get(this.ComList['基础平面地图-地图上的船舶气泡'].id).show();
                stage.get(this.ComList['基础平面地图-地图上的船舶气泡'].id).render(bubbleList.slice(0, 50))  // 客户答应就展示30个  不气泡轮播
                returnType = null
              })
            });
          })
        }
        run3()
        setInterval(run3, 1000 * 60)













        // 核心指标的 集装箱量  数值模拟
        let run4 = () => {
          this.ComApi['Gettwljzxdbsdbsc'].call(this, { dateTimeDt: getCurrentDate() }).then(res => {
            try {
              this.Store.module_hxzb['日集装箱量数值缓存'] = Number(res.data.rows[0].containerThroughputDay) + Number(res.data.rows[0].containerThroughputDayZs);
              this.Store.module_hxzb['月集装箱量数值缓存'] = Number(res.data.rows[0].containerThroughputMonth) + Number(res.data.rows[0].containerThroughputMonthZs);
              this.Store.module_hxzb['年集装箱量数值缓存'] = (Number(res.data.rows[0].containerThroughputYear) + Number(res.data.rows[0].containerThroughputYearZs)) / 10000
              let fn = () => {
                let addNum = Math.floor((Math.random() * 3) + 1);
                this.Store.module_hxzb['日集装箱量数值缓存'] += addNum;
                this.Store.module_hxzb['月集装箱量数值缓存'] += addNum;
                this.Store.module_hxzb['年集装箱量数值缓存'] = (this.Store.module_hxzb['年集装箱量数值缓存'] * 10000 + addNum) / 10000;
                // console.log("==========", this.Store.module_hxzb)
                stage.get("number-title-flop_fMIpH").render([{ value: this.Store.module_hxzb['日集装箱量数值缓存'] }])
                stage.get("number-title-flop_XQNMg").render([{ value: this.Store.module_hxzb['月集装箱量数值缓存'] }])
                stage.get("number-title-flop_wuyRx").render([{ value: this.Store.module_hxzb['年集装箱量数值缓存'] }])
              }
              fn();
              if (this.Store.times['日集装箱量']) {
                clearInterval(this.Store.times['日集装箱量']);
                this.Store.times['日集装箱量'] = null;
              }
              this.Store.times['日集装箱量'] = setInterval(fn, 5000);
            } catch (e) {
              console.log("Gettwljzxdbsdbsc接口错误", e)
            }
          })
        }
        run4()
        setInterval(run4, 1000 * 60 * 60 * 12)




        console.log("Script加载完毕！", this)
      }
    });
    /******************************************----------------业务代码结束----------------******************************************************/
  }, 3000)
}
