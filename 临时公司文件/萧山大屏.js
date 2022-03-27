/**
 * @param {Stage} stage
 */
 module.exports = (stage) => {
  const com = stage.get("@Snxun_datav_sn-cp-tools_Tf2R5").hook(stage);
  const {
    Utils,
    Animation,
    Datav,
    Comm,
    Components
  } = com;

  const { PanelAnimation } = Datav;
  const { Tween } = Animation;

  class HooKController extends Comm {
    constructor(win) {
      super();
      const self = this;
      this.utils = Utils;
      this.animation = Animation;


      // 派出所机构
      this.policeOrg = {
        "330109830000": { "lng": 120.2978631, "lat": 30.1688466, "info": "南站枢纽派出所", "type": "ok", "orgCode": "330109830000" },
        "330109590000": { "lng": 120.4455375, "lat": 30.21118645, "info": "瓜沥派出所", "orgCode": "330109590000", "type": "ok" },
        "330109570000": { "lng": 120.4363765, "lat": 30.26447223, "info": "南阳派出所", "orgCode": "330109570000", "type": "ok" },
        "330109550000": { "lng": 120.3545583, "lat": 30.21607854, "info": "市北派出所", "orgCode": "330109550000", "type": "ok" },
        "330109640000": { "lng": 120.2628529, "lat": 30.23341727, "info": "宁围派出所", "orgCode": "330109640000", "type": "ok" },
        "330109840000": { "lng": 120.2624932, "lat": 30.22312446, "info": "钱江世纪城派出所", "orgCode": "330109840000", "type": "ok" },
        "330109780000": { "lng": 120.2983925, "lat": 30.00830387, "info": "进化派出所", "orgCode": "330109780000", "type": "ok" },
        "330109530000": { "lng": 120.3207328, "lat": 30.14415945, "info": "新塘派出所", "orgCode": "330109530000", "type": "ok" },
        "330109650000": { "lng": 120.1797941, "lat": 30.13024828, "info": "闻堰派出所", "orgCode": "330109650000", "type": "ok" },
        "330109540000": { "lng": 120.2922287, "lat": 30.17718808, "info": "北干派出所", "orgCode": "330109540000", "type": "ok" },
        "330109730000": { "lng": 120.237818, "lat": 30.11180192, "info": "蜀山派出所", "orgCode": "330109730000", "type": "ok" },
        "330109790000": { "lng": 120.1373452, "lat": 29.90521506, "info": "楼塔派出所", "orgCode": "330109790000", "type": "ok" },
        "330109710000": { "lng": 120.2858407, "lat": 30.10992344, "info": "所前派出所", "orgCode": "330109710000", "type": "ok" },
        "330109690000": { "lng": 120.2057804, "lat": 30.01171097, "info": "戴村派出所", "orgCode": "330109690000", "type": "ok" },
        "330109600000": { "lng": 120.5966199, "lat": 30.17794101, "info": "益农派出所", "orgCode": "330109600000", "type": "ok" },
        "330109620000": { "lng": 120.4043252, "lat": 30.16129928, "info": "衙前派出所", "orgCode": "330109620000", "type": "ok" },
        "330109510000": { "lng": 120.2868589, "lat": 30.15324859, "info": "城厢派出所", "orgCode": "330109510000", "type": "ok" },
        "330109770000": { "lng": 120.5460033, "lat": 30.22350269, "info": "党湾派出所", "orgCode": "330109770000", "type": "ok" },
        "330109680000": { "lng": 120.260361, "lat": 29.97659125, "info": "浦阳派出所", "orgCode": "330109680000", "type": "ok" },
        "330109700000": { "lng": 120.205176, "lat": 29.97538148, "info": "河上派出所", "orgCode": "330109700000", "type": "ok" },
        "330109630000": { "lng": 120.3640964, "lat": 30.1939249, "info": "新街派出所", "orgCode": "330109630000", "type": "ok" },
        "330109670000": { "lng": 120.1494373, "lat": 30.08048629, "info": "义桥派出所", "orgCode": "330109670000", "type": "ok" },
        "330109750000": { "lng": 120.4804412, "lat": 30.23173844, "info": "靖江派出所", "orgCode": "330109750000", "type": "ok" },
        "330109660000": { "lng": 120.257157, "lat": 30.05297143, "info": "临浦派出所", "orgCode": "330109660000", "type": "ok" }
      };

      this.config = {
        env: "prod",
        dev: {
          serverAPI: "http://127.0.0.1:8082/files/xiaoshan/",
          suffix: ".json"
        },
        prod: {
          staicAPI: "http://127.0.0.1:8082/files/xiaoshan/", // 静态文件地址
          serverAPI: "https://fzksh.hzos.hzs.zj", // 盛迅
          // serverAPI2: "http://41.200.14.236:9087", // 威灿
          // serverAPI3: "http://41.200.12.57:8099" // 匡信
          serverAPI2: "https://fzksh.hzos.hzs.zj", // 威灿
          serverAPI3: "https://fzksh.hzos.hzs.zj" // 匡信
        }
      };

      // 场景划分
      this.scene = {
        100: {
          name: "宏观场景",
          defaultOrgId: "330109830000,330109590000,330109570000,330109550000,330109640000,330109840000,330109780000,330109530000,330109650000,330109540000,330109730000,330109790000,330109710000,330109690000,330109600000,330109620000,330109510000,330109770000,330109680000,330109700000,330109630000,330109670000,330109750000,330109660000" // 默认机构编号（默认：萧山分局）
        },
        200: {
          name: "基础数据场景",
          selectType:"扬言类",
        },
        300: {
          name: "热点问题排序场景",
          selectType:"涉案财物",
        },
      };
      // 数据缓存
      this.cache["state"] = {
        scene: {
          current: "" // 宏观场景：编号：100（默认：萧山分局）, 
        },
        params: { // 组织机构ID
          orgId: ""
        }
      }


      this.proxyBE = new Proxy(this.cache["state"]["params"], {
        get(target, key) {
          return target[key];
        },
        set(target, key, value) {
          self.log(`变更${value}`, "info")
          setTimeout(() => {
            self.createTask(["2"]); // 四个模块数据重刷
            self.createTask(["1"]); // 派出所数据回到起始状态
          }, 500);

          return Reflect.set(target, key, value)
        }
      });
      // api接口
      this.apiController = {
        "全局派出所数据":{
          url: "http://81.69.20.73:5329/gs/paichusuodianwei.json",
          params: {
            fullPath: true // ajax是否全路径
          },
          fn: this.get_paichusuodianwei_Fn.bind(this)
        },
        "中层履职数据": {
          // url: `${this.config["prod"]["staicAPI"]}/job.json`,
          url: 'http://81.69.20.73:5329/gs/job.json',
          params: {
            fullPath: true // ajax是否全路径
          },
          fn: this.getJobFn.bind(this)
        },
        "基础数据": {
          url: "/xsdp/dp/jcsj",
          params: {
            timer: "年",
            type: "03"
          },
          fn: this.renderBasicData.bind(this)
        },
        "预警模块": {
          url: "/xsdp/dp/yjmk",
          params: {
            timer: "年",
            type: "03"
          },
          fn: this.renderEarlyWarning.bind(this)
        },
        "热点问题排序": {
          url: "/xsdp/dp/rdwt",
          params: {
            timer: "年",
            type: "03"
          },
          fn: this.renderHotProblem.bind(this)
        },
        "派出所执法管理中心运行": {
          url: "/xsdp/dp/glzx",
          params: {
            timer: "年",
            type: "03"
          },
          fn: this.renderPoliceCenter.bind(this)
        }
      };
      // 组件集合
      this.components = {
        "中层履职": {
          "中层履职图层显示-副所长": {
            id: "group_q4uT3",
            children: {
              "未选中": {
                id: "group_EELWA",
                event: "main-img_ZAvfX",
                tag: "副所长"
              },
              "选中": {
                id: "group_32CIZ",
              }
            }
          },
          "中层履职图层显示-机关": {
            id: "group_cQ8U3",
            children: {
              "未选中": {
                id: "group_HJAh6",
                event: "main-img_LvCYi",
                tag: "机关"
              },
              "选中": {
                id: "group_RviaJ",
              }
            }
          },
          "中层履职图层显示-派出所": {
            id: "group_H6anv",
            children: {
              "未选中": {
                id: "group_g8mU3",
                event: "main-img_RN9nY",
                tag: "派出所"
              },
              "选中": {
                id: "group_4Kkoo",
              }
            }
          },
          "中层履职图层显示-分管法制领导": {
            id: "group_diOB3",
            children: {
              "未选中": {
                id: "group_UE3Da",
                event: "main-img_q48aM",
                tag: "分管法制领导"
              },
              "选中": {
                id: "group_u3hNc",
              }
            }
          },
          "中层履职图层显示-办案领导": {
            id: "group_myc4b",
            children: {
              "未选中": {
                id: "group_U0AJr",
                event: "main-img_baQv7",
                tag: "办案领导"
              },
              "选中": {
                id: "group_PLVtL",
              }
            }
          },
          "中层履职-流光": {
            bottom: true,
            id: "group_MTVsC"
          }
        },
        "业务数据组": {
          "面板-左侧-基础数据": "group_SiK7w",
          "面板-左侧-预警模块": "group_GOKAR",
          "面板-左侧-热点问题排序": "group_PsjDR",

          "面板-右侧-派出所执法管理中心运行": "group_XFcg2",
          "面板-右侧-中层履职": "group_8dQgW",
          "面板-右侧-中层履职": "group_8dQgW",
          "地图": "group_NQm3y",

        },
        "弹窗": {
          "弹窗-热点问题排序": {
            id: "group_dN8EF",
            close: "main-img_crFH3"
          },
          "弹窗-未审核数": {
            id: "group_N67nX",
            close: "main-img_0s5H2"
          },
          "弹窗-未整改数": {
            id: "group_QR9n9",
            close: "main-img_IxPur"
          },
          "弹窗-基础数据四类指标": {
            id: "group_ryje0",
            close: "main-img_NJJmB"
          }
        },
        "事件交互组": {
          "基础数据TAB": {
            id: "@Snxun_datav_sn-cp-enumeration_N0U4z",
            mutual: {
              params: {
                api: "基础数据",
              },
              eventName: "tabClick",
              fn: this.changeBuinessTimer
            }
          },
          "预警模块TAB": {
            id: "@Snxun_datav_sn-cp-enumeration_hOJ52",
            api: "预警模块",
            mutual: {
              params: {
                api: "预警模块",
              },
              eventName: "tabClick",
              fn: this.changeBuinessTimer
            }
          },
          "热点问题排序TAB": {
            id: "@Snxun_datav_sn-cp-enumeration_kZ1j4",

            mutual: {
              params: {
                api: "热点问题排序",
              },
              eventName: "tabClick",
              fn: this.changeBuinessTimer
            }
          },
          "派出所执法管理中心运行TAB": {
            id: "@Snxun_datav_sn-cp-enumeration_uYNk6",

            mutual: {
              params: {
                api: "派出所执法管理中心运行",
              },
              eventName: "tabClick",
              fn: this.changeBuinessTimer
            }
          },

          "中心运行区块列表": {
            id: "xiaoshan-pcszfglzxyy_kpt8x",
            mutual: {
              // params: {
              //     api: "派出所执法管理中心运行",
              // },
              eventName: "row-click",
              fn: this.problems
            }
          },
          // "基础数据TAB": {
          //     id: "@Snxun_datav_sn-cp-enumeration_N0U4z",
          //     mutual: {
          //         eventName: "tabClick",
          //         fn: this.changeBuinessTimer
          //     }
          // },
          "中层履职标题": {
            id: "group_cbS6P",
            mutual: {
              dom: true, // dom事件
              eventName: "click",
              params: {
                layerId: "中层履职",

              },
              fn: this.showLayer
            }
          },
          "系统标题": {
            id: "group_2XzbN",
            mutual: {
              dom: true, // dom事件
              eventName: "click",
              params: {
                layerId: "业务数据组"
              },
              fn: this.showLayer
            }
          },

          "热点问题排序列表": {
            id: "@Snxun_datav_sn-cp-srcoll-table_eA1K2",
            mutual: {
              eventName: "cellClick",
              params: {
                scene: "300"
              },
              fn: this.changeScene
            }
          },
          "公安局点位": {
            id: "datavmap-canvas2d-scatter-image_b9CYq",
            mutual: {
              eventName: "click",
              fn: this.dotPoliceClickFn
            }
          },
          "扬言类": {
            id: "group_9n6BA",
            mutual: {
              dom: true, // dom事件
              params: {
                tag: "扬言类",
                scene: "200"
              },
              eventName: "click",
              fn: this.changeScene
            }
          },
          "涉酒类": {
            id: "group_XrUzl",
            mutual: {
              dom: true, // dom事件
              params: {
                tag: "涉酒类",
                scene: "200"
              },
              eventName: "click",
              fn: this.changeScene
            }
          },
          "家暴类": {
            id: "group_2Mi2h",
            mutual: {
              dom: true, // dom事件
              params: {
                tag: "家暴类",
                scene: "200"
              },
              eventName: "click",
              fn: this.changeScene
            }
          },
          "重点伤害": {
            id: "group_JAMjP",
            mutual: {
              dom: true, // dom事件
              params: {
                tag: "重点伤害",
                scene: "200"
              },
              eventName: "click",
              fn: this.changeScene
            }
          }
        },
        "数据渲染组": {
          "公安局点位": "datavmap-canvas2d-scatter-image_b9CYq",
          "中层履职列表": "@Snxun_datav_sn-cp-srcoll-table_l0fz7",
          "副所长数量": "number-title-flop_BJiNz",
          "派出所数量": "number-title-flop_a3MTi",
          "机关数量": "number-title-flop_pX27X",
          "分管法制领导数量": "number-title-flop_9hqkr",
          "办案领导数量": "number-title-flop_PVi86",
          "中心运行区块列表": "xiaoshan-pcszfglzxyy_kpt8x",
          "中心运行问题列表": "@Snxun_datav_sn-cp-srcoll-table_gjwdd"
        }
      };


      // 任务中心
      this.taskCenter = {
        1: {
          name: "数据初始化",
          tasks: ["中层履职数据",'全局派出所数据'], //, "基础数据", "预警模块", "热点问题排序", "派出所执法管理中心运行"
          eventType: "init" // autoPlay
        },
        2: {
          name: "交互驱动渲染",
          tasks: ["基础数据", "预警模块", "热点问题排序", "派出所执法管理中心运行"],
          eventType: "click" // autoPlay
        }
      };
      setTimeout(this.init.bind(this), 3000);
      return this;
    };
    /**
     * 请求数据封装类
     * @param {*} url 
     * @param {*} params 
     * @returns 
     */
    ajax(url, params, opt = {}) {
      const self = this;
      const cfg = this.config[this.config.env];
      let requestUrl = opt.fullPath || params.fullPath ? url : `${cfg.serverAPI}${url}${cfg.suffix || ""}`;
      
      return new Promise((resolve, reject) => {
        let options = {
          url: requestUrl,
          type: "get",
          data: Object.assign({
            orgId: this.proxyBE.orgId, // 组织ID
            orgCode: this.proxyBE.orgId, // 组织ID
          }, params),
          async: true,
          success:function(res){
            resolve(res)
          },
          error: function (e) {
            console.error("请求失败", e.status, e.responseText);
          }
        };
        $.ajax(Object.assign(options, opt));
      });
    };
    /**
     * 切换面板
     * @param {*} dgName 
     */
    toggleDialog(dgName) {
      Object.keys(this.components["弹窗"]).forEach(v => {
        const com = stage.get(this.components["弹窗"][v]["id"]);
        const status = v == dgName;
        $(com.container)[status ? "fadeIn" : "fadeOut"]();
      })
    };
    /**
     * 切换图层
     * @param {*} layerId 
     */
    showLayer(opt) {
      ["中层履职", "业务数据组"].forEach(v => {
        if (v == "中层履职") {
          Object.keys(this.components[v]).forEach(name => {
            const layer = this.components[v][name];
            const layerCom = stage.get(layer.id);
            if (layerCom) {
              const dom = $(layerCom.container);
              if (opt.layerId == "中层履职") {
                dom.fadeIn();
              } else {
                dom.fadeOut();
                this.activeModule("");
                this.filterJob("", true);
              }
            }
          });
          this.toggleDialog("");
        }
        if (v == "业务数据组") {
          this.cache.state.scene.current = 100;
          this.proxyBE.orgId = this.scene["100"]["defaultOrgId"];
          Object.keys(this.components[v]).forEach(name => {
            if (name != "面板-右侧-中层履职") { // 两种业务共同呈现
              const layerCom = stage.get(this.components[v][name]);
              if (layerCom) {
                const dom = $(layerCom.container);
                if (opt.layerId == "业务数据组" && name.indexOf('弹窗') == -1) {
                  dom["fadeIn"]();
                } else {
                  dom["fadeOut"]();
                }
              }
            }
          });
        }
      });
    };
    initMask() {
      ["Cu16O", "7Id4Q", "amBZq", "pZsrc", "vmRRe", "fTCgJ", "5QwjE", "LFIQ8", "P8dAL", "gd5Xc", "jOktL", "Xrfwc", "jmfII", "eAr7x", "4xYzd", "wTsN9", "l2IW2", "3bT8A", "h4iub", "4Euex", "TyEip", "Vjon3", "2UQQk", "UOlnm", "q0aLe", "NXrIE", "BAPVJ", "uqnVY"].forEach(v => {
        stage.get(`main-img_${v}`).container.css({ "pointer-events": "none" })
      });
      // $(stage.get(this.components["数据渲染组"]["中心运行问题列表"]).container).addClass("problem")
    };
    runTask(taskName) {
      const controller = this.apiController[taskName];
      if (controller) {
        this.ajax(controller.url, Object.assign({}, controller.params, { orgId: this.proxyBE.orgId })).then(data => {
          controller.fn.call(self, data)
        })
      }
    };
    createTask(taskId) {

      console.log("任务调度", taskId);
      // 构建新的任务队
      const self = this;
      Object.entries(this.taskCenter).forEach(v => {
        // if (v[1].eventType == "init") {
        if (taskId.indexOf(v[0]) != -1) { // 初始化任务
          v[1].tasks.forEach(taskName => {
            this.runTask(taskName);
            // const controller = this.apiController[taskName];
            // if (controller) {
            //     self.ajax(controller.url, controller.params).then(data => {
            //         controller.fn.call(self, data)
            //     })
            // }
          });
        }
        //}
      });
    };
    /**
     * 事件的注册
     */
    registerEvent() {





      const self = this;
      // $(document.body).keydown((e) => {
      //     this.showLayer(e.keyCode == 49 ? "中层履职" : "业务数据组")
      // });

      // 组件事件的绑定（组件事件，DOM事件）
      Object.keys(this.components["事件交互组"]).forEach(name => {
        const layer = this.components["事件交互组"][name];
        const mutual = layer.mutual;
        const com = stage.get(layer.id);
        if (mutual.dom) {
          $(com.container).click(function (e) {
            mutual.fn.call(self, Object.assign({}, mutual.params || {}, e));
          });
        } else {
          //mutual.eventName
          com.on(mutual.eventName, function (e) {
            mutual.fn.call(self, Object.assign({}, mutual.params || {}, e));
          })
        }
      });

      //stage.get("公安局点位").on("click")

      console.log("//////", stage.get("datavmap-canvas2d-scatter-image_b9CYq"));

      Object.entries(this.components["中层履职"]).forEach(group => {
        if (group[1].children) {
          const com = stage.get(group[1].children["未选中"].event);

          if (com) {
            $(com.container).click(function () {
              self.activeModule.call(self, group[0], group[1].children["未选中"]["tag"])
            })
          }
        }
      });

      Object.keys(this.components["弹窗"]).forEach(v => {
        const com = stage.get(this.components["弹窗"][v]["close"]);
        if (com) {
          $(com.container).click(function (e) {
            const dg = stage.get(self.components["弹窗"][v].id);
            if (dg) {
              $(dg.container).fadeOut();
            }
          });
        }
      })

      this.createTask(["1"]);
    };
    loadCss() {
      let css = "";
      css += '<style type="text/css">';
      css += `.problem .txt{
                 color:#fff !important;
                 font-weigh:bold;
                 height:20px;
                 line-height:20px;
                 transition:all 0.3s linear;
                 font-size:18px;
              }`;
      css += " </style>";
      $("head").append(css)
    };
    init() {
      this.loadCss();
      this.initMask();

      this.registerEvent();
      this.showLayer({ layerId: "业务数据组" })
    };
    /**
     * 时间格式转变
     * @param {*} type 
     * @returns 
     */
    timerChangeTo(type) {
      var now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDay();
      if (type == "03") { // 年
        return {
          kssj: `${year}-01-01`,
          jssj: `${year}-${month}-${day}`
        }
      }
      if (type == "02") { // 月
        return {
          kssj: `${year}-${month}-01`,
          jssj: `${year}-${month}-${day}`
        }
      }
      if (type == "01") { // 日
        return {
          kssj: `${year}-${month}-${day} 00:00:00`,
          jssj: `${year}-${month}-${day} 24:00:00`
        }
      }
    };
    // 业务相关
    changeBuinessTimer(data) {
      if (data) {
        const api = this.apiController[data.api];
        if (api) {
          api.params["type"] = {
            "年": "03",
            "月": "02",
            "日": "01"
          }[data.label];
          // 本日:01 本月:02 本年:03 
          this.runTask(data.api);
        }
      }
    };
    changeBuinessOrgId(data) {
      if (data) {
        this.proxyBE.orgId = data.orgId;
      }
    };
    /**
     * 激活对应履职模块
     * @param {*} name 
     */
    activeModule(name, level) {
      const self = this;
      Object.entries(this.components["中层履职"]).forEach(function (group) {
        if (group[1].children) {
          const com = stage.get(group[1].children["未选中"].id);
          const activeCom = stage.get(group[1].children["选中"].id);
          const status = group[0] == name;
          if (status) {
            $(com.container)["fadeOut"]();
            $(activeCom.container)["fadeIn"]();
            self.filterJob(level);
          } else {
            $(com.container)["fadeIn"]();
            $(activeCom.container)["fadeOut"]();

          }
        }
      })
    };
    /**
     * 获取职务数据
     * @param {*} data 
     */
    getJobFn(data) {
      console.log("获取职务数据")
      this.cache["job"] = data;
      var result = [];
      if (data) {
        let i = 1;
        data.forEach((v, i) => {
          result.push(Object.assign({
            index: i + 1,
            issue: v["issueChildren"] ? v["issueChildren"].length : 0
          }, v));
        })
      }
      stage.get(this.components["数据渲染组"]["中层履职列表"]).render(result);
    };
    /**
     * 获取全局派出所数据
     * @param {*} data 
     */
    get_paichusuodianwei_Fn(data){
      console.log("获取全局派出所数据")
      this.cache["paichusuodianwei"] = data;
      if (data) {
        stage.get(this.components["数据渲染组"]["公安局点位"]).render(data);
      }
    }
    /**
     * 派出所点位点击事件
     * @param {*} e 
     */
    dotPoliceClickFn(e) {
      const sceneId = this.cache.state.scene.current;
      if (sceneId == "100") {
        this.log(`todo映射组织机构Id`, 'error')
        this.proxyBE.orgId = e.orgCode; // e.info
      }
      if (sceneId == "200") {
        this.log(`问题1：没有接口;问题2：todo映射组织机构Id`, 'error')
        this.toggleDialog("弹窗-基础数据四类指标");
        this.getDialogBasic(e.orgCode);
      }
      if (sceneId == "300") {
        this.toggleDialog("弹窗-热点问题排序");
        // this.proxyBE.orgId = e.orgCode; // e.info
        this.getDialogHotProblem(e.orgCode, e.type)
      }
    };
    /**
     * 获取弹窗-基础数据四类指标
     * @param {*} orgId 
     */
    getDialogBasic(orgId) {

      const module = this.apiController["基础数据"];
      const dataMap = {
        "01": "date",
        "02": "month",
        "03": "year"
      };
      const jqCode = {
        "扬言类": 13000,
        "涉酒类": 40700,
        "家暴类": 10160,
        "重点伤害": 10900
      };
      const url = this.config["prod"].serverAPI3 + "/xsdp/dp/DGG_004";
      $.ajax({
        url: url,
        type: "post",
        dataType: 'json',
        contentType: 'application/json,charset=UTF-8',
        data: JSON.stringify({
          type: jqCode[this.scene[200].selectType], // 警情类型代码
          time: decodeURI(dataMap[module.params.type]), //时间（当日，当月，当年）
          deptCode: orgId, //派出所代码
        }),
        success: function (data) {
          if (Object.prototype.toString.call(data.result) == '[object Array]') {
            const result = [];
            data.result.forEach(v => {
              result.push(v);
            })
            stage.get("carousel-table_fORXy").render(result)
          } else {
            self.log(`获取${data.tag}数据异常:url(${url})`, 'error')
          }
        }
      });
    };
    /**
     * 获取弹窗-热点问题排序
     * @param {*} orgCode 组织机构编号
     * @param {*} type  案件类型
     */
    getDialogHotProblem(orgCode,type) {
      const server = this.config["prod"];
      // 警情：jq；案件:aj；涉案财物:sacw；视音频:syp；办案区使用管理:baq

      this.log(`案件类型怎么约定`, 'error');
      const modulePamars = this.apiController["热点问题排序"]["params"];
      const timer = this.timerChangeTo(modulePamars.type);
      const url = this.config["prod"].serverAPI2 + "/xsdp/dp/rdwt/px";
      this.ajax(url, Object.assign({}, {
        orgCode: orgCode,
        kssj: timer.kssj, // 开始时间
        jssj: timer.jssj, // 结束时间
        wtlx: type, //问题类型  || this.scene[300].selectType
        pageNo: 1, //开始页
        pageSize: 100 //结束页

      })).then(data => {
        //stage.get("carousel-table_jNra5")
        const result = [];
        if (Object.prototype.toString.call(data.data) == '[object Array]') {
          data.data.forEach(v => {
            result.push(v);
          });
        }
        stage.get("carousel-table_jNra5").render(result);
      })
    };
    /**
     * 过滤职务数据
     * @param {*} level 职务等级
     */
    filterJob(level, rest = false) {
      const result = [];
      if (this.cache["job"]) {
        let i = 1;
        if (!rest) {

          var sum = 0;
          this.cache["job"].forEach(v => {
            if (v[["机关", "派出所"].indexOf(level) == -1 ? "五类管理层级所属" : "序1"] == level) {
              if (v["issueChildren"]) {
                result.push(Object.assign({
                  index: i,
                  issue: v["issueChildren"].length
                }, v));

                i++;
              }
              sum += 1;
            }
          });
          stage.get(this.components["数据渲染组"][`${level}数量`]).render([{
            value: sum
          }]);
        } else {
          this.cache["job"].forEach((v, i) => {
            result.push(Object.assign({
              index: i + 1,
              issue: v["issueChildren"] ? v["issueChildren"].length : 0
            }, v));
          })
        }
      };
      stage.get(this.components["数据渲染组"]["中层履职列表"]).render(result);
    };
    /**
     * 变换场景（基础数据/热点问题/宏观场景）
     * @param {*} data 
     */
    changeScene(data) {
      console.log(":::::", data);

      const self = this;
      this.cache["state"]["scene"]["current"] = data.scene;
      // todo 过滤派出所
      if (data.scene == 200) {
        this.scene[200].selectType = data.tag
        const module = this.apiController["基础数据"];
        const dataMap = {
          "01": "date",
          "02": "month",
          "03": "year"
        };
        const jqCode = {
          "扬言类": 13000,
          "涉酒类": 40700,
          "家暴类": 10160,
          "重点伤害": 10900
        };
        const url = this.config["prod"].serverAPI3 + "/xsdp/dp/DGG_003";
        $.ajax({
          url: url,
          type: "post",
          dataType: 'json',
          contentType: 'application/json,charset=UTF-8',
          data: JSON.stringify({
            type: jqCode[data.tag],
            time: decodeURI(dataMap[module.params.type])
          }),
          success: function (data) {
            if (Object.prototype.toString.call(data.result) == '[object Array]') {
              const result = [];
              data.result.forEach(v => {
                if (this.policeOrg[v.deptCode]) {
                  result.push(Object.assign({
                    tag: data.tag
                  }, this.policeOrg[v.deptCode]))
                }
              })
              stage.get("datavmap-canvas2d-scatter-image_b9CYq").render(result)
            } else {
              self.log(`获取${data.tag}数据异常:url(${url})`, 'error')
            }
          }
        });

      }
      if (data.scene == 300) {
        this.scene[300].selectType = data.wtlxbm;
        let result = [];
        self.cache.paichusuodianwei.forEach(i=>{
          if(data.children.findindex(paichusuo=>paichusuo.orgCode==i.orgCode) !=-1){
            result.push(i)
          }
        })
        stage.get(this.components["数据渲染组"]["公安局点位"]).render(result);
      }
      this.log(`todo 过滤派出所`, "error");
    };

    /**
     * 渲染基础数据
     * @param {*} data 
     */
    renderBasicData(data) {
      if(!data) return
      console.log("渲染基础数据", data);
      var data = data.data;

      const ComponetMap = {

        "扬言类数值": "number-title-flop_7WLL9",
        "扬言类数值百分比": "number-title-flop_nWqbj",

        "涉酒类数值": "number-title-flop_iQooK",
        "涉酒类数值百分比": "number-title-flop_CTuRJ",

        "家暴类数值": "number-title-flop_75Tvo",
        "家暴类数值百分比": "number-title-flop_YINbt",

        "重点伤害数值": "number-title-flop_ThvtR",
        "重点伤害数值百分比": "number-title-flop_DBEn2",


        "警情环图": "pie_1W8jK",
        "警情总数": "number-title-flop_2VWQc",
        "警情数": "number-title-flop_SVyh1",
        "办案人数": 'number-title-flop_hRcjf',
        "案件数": 'number-title-flop_g4uMK'
      }
      var result = [];
      var sum = 0;
      if (data.lbsj) {
        data.lbsj.forEach(v => {
          stage.get(ComponetMap[`${v.lb}数值`]).render([{
            value: v.sl
          }]);
          stage.get(ComponetMap[`${v.lb}数值百分比`]).render([{
            value: v.bfb
          }]);
          result.push({
            "name": v.lb,
            "value": v.sl
          });
          sum += v.lb;
        })
      }
      stage.get(ComponetMap[`警情环图`]).render(result);

      stage.get(ComponetMap[`警情数`]).render([{
        value: jqs
      }]);

      stage.get(ComponetMap[`办案人数`]).render([{
        value: data.baqrys
      }]);
      stage.get(ComponetMap[`案件数`]).render([{
        "value": data.ajs
      }]);
      stage.get(ComponetMap[`警情总数`]).render([{
        "value": data.jqzs
      }]);

    };
    /**
     * 渲染预警模块
     * @param {*} data 
     */
    renderEarlyWarning(data) {
      if(!data) return
      console.log("渲染预警模块");
      var data = data.data;
      const ComponetMap = {
        "预警总数": { com: "number-title-flop_PIcje", key: "yjzs" },

        "整改总数": { com: "number-title-flop_Gvdc1", key: "zgzs" },
        "分局预警": { com: "number-title-flop_MbHcb", key: "fjyj" },
        "自动预警": { com: "number-title-flop_qiWZG", key: "zdyj" },
        "智慧法制预警": { com: "number-title-flop_FVbJr", key: "zhfzyj" }
      };

      Object.keys(ComponetMap).forEach(key => {
        const v = ComponetMap[key];
        const com = stage.get(v.com);
        if (com && data[v["key"]]) {
          com.render([{
            value: data[v["key"]]
          }])
        } else {
          console.error(`${key}组件渲染异常`)
        }
      })
    };
    /**
     * 渲染热点问题排序
     * @param {*} data 
     */
    renderHotProblem(data) {
      if(!data) return
      console.log("渲染热点问题排序");
      const ComponetMap = {
        "问题排序列表": "@Snxun_datav_sn-cp-srcoll-table_eA1K2"
      };
      var result = [];
      if (Object.prototype.toString.call(data.data) == '[object Array]') {
        result = data.data.map((v, i) => {
          let numObj = v.infos.reduce((T,C,I)=>{
            if(C.sl>=T.num){
              T.num = C.sl
              T.code = C.orgCode
            }
            return T
          },{num:0,code:"xxx"})
          return {
            "number": (i + 1),
            "detail": v.wtlx,
            "wtlxbm": v.wtlxbm,
            "title": v.count,
            "type": this.policeOrg[numObj.code]['info'] || "-",
            "children":v.infos
          }
        })
      }
      stage.get(ComponetMap["问题排序列表"]).render(result);
    };
    /**
     * 渲染派出所执法管理中心运行
     * @param {*} data 
     */
    renderPoliceCenter(data) {
      if(!data) return
      console.log("渲染派出所执法管理中心运行", data);
      const ComponetMap = {
        "总数问题柱图": "@Snxun_datav_sn-cp-srcoll-table_gjwdd",
        "审核数未审核数已整改未整改": "@Snxun_datav_sn-cp-srcoll-table_B2ZEu",

        "中心运行区块列表": "xiaoshan-pcszfglzxyy_kpt8x"
      }
      var result1 = [],
        result2 = [];

      if (Object.prototype.toString.call(data.data) == '[object Array]') {
        var result1 = [],
          result2 = [];
        data.data.forEach(v => {
          result1.push(v);
        });
      }
      stage.get(ComponetMap[`中心运行区块列表`]).render(result1);
    };
    /**
     * 派出所执法管理中心运行(未审核与未整改弹窗)
     * @param {*} data 
     */
    problems(data) {
      if (data.tag == "未审核") {
        this.toggleDialog("弹窗-未审核数");
      }
      if (data.tag == "未整改") {
        this.toggleDialog("弹窗-未整改数");
      }
      this.getDialogProblem(data);
    };
    /**
     * 派出所执法管理中心运行(未审核与未整改弹窗数据列表渲染)
     * @param {*} data 
     */
    getDialogProblem(data) {
      const self = this;
      const title = {
        "未整改标题": "main-title_ykjzI",
        "未审核标题": "main-title_IeLNn",
      };
      // 案件类型映射
      const WtlxMap = {
        "警情": "jq",
        "案件": "aj",
        "涉案财物": "sacw",
        "视音频": "syp",
        "办案区使用管理": "baq"
      };
      const ModuleMap = {
        "警情未审核": {
          name: "警情未审核",
          url: "/xsdp/dp/glzx/jqwsh",
          comId: "carousel-table_iectP"
        },
        "案件未审核": {
          name: "案件未审核",
          url: "/xsdp/dp/glzx/ajwsh",
          comId: "carousel-table_EfQGU"
        },
        "办案区使用管理未审核": {
          name: "办案区使用管理未审核",
          url: "/xsdp/dp/glzx/baqglwsh",
          comId: "carousel-table_CMDC7"
        },
        "涉案财物未审核": {
          name: "涉案财物未审核",
          url: "/xsdp/dp/glzx/sacwwsh",
          comId: "carousel-table_livCs"
        },
        "音视频未审核": {
          name: "音视频未审核-接处警",
          url: "/xsdp/dp/glzx/yspwsh",
          comId: "carousel-table_X3s5f"
        },
        // 1: {
        //     name: "音视频未审核-办案区",
        //     url: "/rest/dgg/getBaqYspDshPageDate",
        //     comId: "carousel-table_G8fMe"
        // },
        // 1: {
        //     name: "音视频未审核-迅询问",
        //     url: "/rest/dgg/getBaqXxwDshPageDate",
        //     comId: "carousel-table_S9XcC"
        // },
        // 1: {
        //     name: "音视频未审核-执法行为",
        //     url: "/rest/dgg/getAjZfxwDshPageDate",
        //     comId: "carousel-table_TRmec"
        // },
        "未整改": {
          name: "未整改",
          url: "/xsdp/dp/glzx/qbwzg",
          comId: "carousel-table_5eSkk"
        }
      }


      var node = null;
      Object.keys(ModuleMap).forEach(v => {
        let status = false;
        status = data.tag == "未整改" ? (v == "未整改") : (v == `${data.flag}${data.tag}`);
        if (status) {
          node = ModuleMap[v];
        }
        stage.get(ModuleMap[v]["comId"])[status ? "show" : "hide"]();
      });

      // 时间转换处理
      const modulePamars = this.apiController["派出所执法管理中心运行"]["params"];
      const timer = this.timerChangeTo(modulePamars.type);

      if (node) {
        const url = this.config["prod"].serverAPI2 + node.url;
        let options = {
          kssj: timer.kssj,
          jssj: timer.jssj,
          orgCode: this.proxyBE.orgId,
          pageNo: 1,
          pageSize: 100
        };
        // 问题类型
        if (data.tag == "未整改") {
          options["wtlx"] = WtlxMap[data.flag] || ""; //问题类型	警情：jq；案件:aj；涉案财物:sacw；视音频:syp；办案区使用管理:baq
        }
        this.ajax(url, options, {
          type: "post",
          fullPath: true
        }).then(res => {
          if (Object.prototype.toString.call(res.data) == '[object Array]') {

            const result = [];
            res.data.forEach(v => {
              switch (data.flag) {
                case "警情":
                  v.sfglaj = v.sfglaj == 1 ? "是" : "否";
                  v.sfhd = {
                    "01": "核对中",
                    "02": "已核对",
                    "03": "未核对"
                  }[v.sfhd] || "未知"
                  break;
                case "案件":
                  v.sfhd = {
                    "01": "核对中",
                    "02": "已核对",
                    "03": "未核对"
                  }[v.sfhd] || "未知"
                  break;
                case "涉案财物":
                  v.hdzt = {
                    "00": "未核对",
                    "01": "核对中",
                    "03": "已核对"
                  }[v.hdzt] || "未知"
                  break;
                case "办案区使用管理":
                  v.hdzt = {
                    "00": "未核对",
                    "01": "核对中",
                    "03": "已核对"
                  }[v.hdzt] || "未知"
                  break;
                default:
                  break;
              }

              result.push(v);
            });

            stage.get(node.comId).render(result)
          } else {
            self.log(`获取${data.flag}${data.tag}数据异常:url(${url})`, 'error')
          }
        });
      }
      if (data.tag == "未审核") {
        stage.get(title["未审核标题"]).render([{
          value: `${data.flag}未审核列表`
        }]);
      }
      if (data.tag == "未整改") {
        stage.get(title["未整改标题"]).render([{
          value: `${data.flag}未整改列表`
        }])
      }
    }
  };

  new HooKController();
}