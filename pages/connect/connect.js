// pages/connect/connect.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      ssid: 'WiFi SSID',
      bssid: '设备MAC',
      password: '密码',
      navBarHeight: 0, // 新增：导航栏总高度
      navBarTitleTop: 0 // 新增：标题距离顶部的距离
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      // 保留你原有的业务逻辑
      let ssid = options.ssid;
      let bssid = options.bssid;
      let password = options.password;
      this.setData({
        ssid: ssid,
        bssid: bssid,
        password: password
      })
  
      // 新增：导航栏高度计算逻辑
      const sysInfo = wx.getSystemInfoSync();
      const menuButton = wx.getMenuButtonBoundingClientRect();
      const navBarHeight = menuButton.top + menuButton.height + (menuButton.top - sysInfo.statusBarHeight);
      const navBarTitleTop = sysInfo.statusBarHeight + (menuButton.top - sysInfo.statusBarHeight);
  
      this.setData({
        navBarHeight: navBarHeight,
        navBarTitleTop: navBarTitleTop
      });
    },
  
    /**
     * 点击连接按钮触发
     */
    connectWifi: function() {
      const that = this;
      wx.showToast({
        title: '请稍等...',
      })
      that.startWiFi();
    },
  
    /**
     * 加载WiFi模块
     */
    startWiFi: function() {
      const that = this;
      wx.startWifi({
        complete: (res) => {
          that.connected();
        },
      })
    },
  
    /**
     * 连接WiFi
     */
    connected: function() {
      const that = this;
      wx.connectWifi({
        SSID: that.data.ssid,
        BSSID: that.data.bssid,
        password: that.data.password,
        success: () => {
          wx.showToast({
            title: 'WiFi连接成功',
          })
          // 跳转至成功页面
          wx.redirectTo({
            url: '/pages/success/success',
          })
        },
        fail: (res) => {
          that.errorDialog(res);
        }
      })
    },
  
    /**
     * 连接失败弹窗
     * @param {错误返回} res 
     */
    errorDialog: function(res) {
      const that = this;
      let content = res.errMsg; // 默认使用系统错误信息
  
      // 判断错误信息是否包含 'Undefined'，如果是则修改提示内容
      if (res.errMsg.includes('Undefined')) {
        content = '需要SSID和Password参数配置，请联系rizona.cn@mgail.com。';
        wx.showModal({
          title: '未能正确配置',
          content: content,
          showCancel: false, // 隐藏取消按钮
          confirmText: '关闭', // 确认按钮文本改为“关闭”
          success(res) {
            if (res.confirm) {
              console.log('用户点击了关闭');
            }
          }
        });
      } else {
        // 如果不是参数错误，则显示带有复制密码功能的弹窗
        wx.showModal({
          title: '连接失败',
          content: content,
          confirmText: '复制密码',
          success(res) {
            if (res.confirm) {
              that.copyPassword();
            } else if (res.cancel) {
              console.log('cancel')
            }
          },
          fail(res) {
            wx.showToast({
              title: res.errMsg,
            })
          }
        });
      }
    },
  
    /**
     * 复制密码到剪贴板
     */
    copyPassword: function() {
      const that = this;
      wx.setClipboardData({
        data: that.data.password,
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log(res.data);
            }
          })
        }
      })
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
  
    }
  })