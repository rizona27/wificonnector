// pages/connect/connect.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      ssid: 'WIFI SSID',
      bssid: '设备MAC',
      password: '密码',
      navBarHeight: 0,
      navBarTitleTop: 0,
      isConnecting: false,
      buttonText: '点击连接'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      if (options.ssid) {
        this.setData({
          ssid: options.ssid,
          bssid: options.bssid || '',
          password: options.password || ''
        });
      }
  
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
      
      // 关键修改1: 在调用前检查SSID是否为默认值
      if (that.data.ssid === 'WIFI SSID') {
        wx.showModal({
          title: '配置错误',
          content: '请联系作者，获取正确的小程序码。', // 使用content字段显示完整信息
          showCancel: false, // 不显示取消按钮
          confirmText: '确定'
        });
        return; // 终止函数执行
      }

      // 关键修改2: 更新按钮状态
      that.setData({
        isConnecting: true,
        buttonText: '正在连接...'
      });

      // 正常连接逻辑
      wx.showToast({
        title: '请稍等...',
        icon: 'loading',
        duration: 20000 
      })
      that.startWiFi();
    },
  
    /**
     * 加载WiFi模块
     */
    startWiFi: function() {
      const that = this;
      wx.startWifi({
        complete: () => {
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
          that.setData({
            isConnecting: false,
            buttonText: '点击连接'
          });
          wx.redirectTo({
            url: '/pages/success/success',
          })
        },
        fail: (res) => {
          that.setData({
            isConnecting: false,
            buttonText: '点击连接'
          });

          let content = '请检查网络或稍后再试。';
          if (res.errMsg && res.errMsg.includes('fail to get user\'s approval')) {
            content = '连接被用户取消。';
          }
          
          // 关键修改：将失败提示也改为Modal，显示更详细的信息
          wx.showModal({
            title: '连接失败',
            content: content,
            showCancel: false,
            confirmText: '确定'
          });
        }
      })
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
  
    onReady: function() { },
    onShow: function() { },
    onHide: function() { },
    onUnload: function() { },
    onPullDownRefresh: function() { },
    onReachBottom: function() { },
    onShareAppMessage: function() { }
  });