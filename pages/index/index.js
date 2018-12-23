Page({
  /**
  * 初始化数据
  */
  data: {
    phone: '',
    password: '',
    url: ''
  },
  onLoad: function (options) {
    var that = this;


    wx.scanCode({
      success(res) {

        console.log(res)
        that.data.url = res.result;

        if (that.data.phone != '' && that.data.password != '' && that.data.url != '') {
          console.log('yayayayayayyaayyayaayay')

          wx.request({
            url: 'https://yimian.xyz/qr_scan_ice', //仅为示例，并非真实的接口地址
            data: {
              usr: that.data.phone,
              pswd: that.data.password,
              url: that.data.url
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data.msg)
              that.showok(res.data);
            }
          })



        }
      }
    })

    wx.getStorage({
      key: 'usr',
      success(res) {
        console.log('stor usr:'+res.data)
        that.data.phone = res.data;
        console.log('stor usr:' + that.data.phone)
      }
    })

    wx.getStorage({
      key: 'psswd',
      success(res) {
        console.log('stor psd:' +res.data)
        that.data.password = res.data;
        console.log('stor psd:' + that.data.password)
      }
    })


  },
  /**
   * 监听手机号输入，并把输入的值保存在data变量中
   */
  listenerPhoneInput: function (e) {
    console.log('Phone=' + e.detail.value)
    this.data.phone = e.detail.value;

  },
  /**
   * 监听密码输入，并把输入的值保存在data变量中
   */
  listenerPasswordInput: function (e) {
    console.log('Password=' + e.detail.value)
    this.data.password = e.detail.value;
  },
  /**
   * 监听登录按钮，获取保存在data变量中的值
   */
  listenerLogin: function () {
    var that=this;
    //打印收入账号和密码
    console.log('手机号为: ', this.data.phone);
    console.log('密码为: ', this.data.password);
    console.log('url为: ', this.data.url);
    wx.setStorage({
      key: "usr",
      data: that.data.phone
    })
    wx.setStorage({
      key: "psswd",
      data: that.data.password
    })

    wx.request({
      url: 'https://yimian.xyz/qr_scan_ice', //仅为示例，并非真实的接口地址
      data: {
        usr: that.data.phone,
        pswd: that.data.password,
        url: that.data.url
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.msg)
      }
    })

  },

  showok: function (res) {
    if(res.msg==666)
    {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 3000
    })
    }

    if (res.msg == 'IP') {
      wx.showToast({
        title: '请确认已连接学校Wifi',
        icon: 'none',
        duration: 3000
      })
    }


    if (res.msg == 'ERROR') {
      wx.showToast({
        title: '请不要扫描非签到二维码',
        icon: 'none',
        duration: 3000
      })
    }


    if (res.msg == 'LOGIN') {
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'none',
        duration: 3000
      })
    }



  }  
  
})