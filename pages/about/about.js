// pages/about/about.js
Page({
    data: {
        colors: [
            '#FF6347', '#4682B4', '#FFD700', '#32CD32', '#BA55D3', 
            '#FF4500', '#1E90FF', '#FF69B4', '#00CED1', '#9932CC', 
            '#008080', '#DC143C', '#8B008B', '#BDB76B', '#FF8C00'
        ],
        lineColors: [],
        currentDate: '', 
        currentTime: '',
        navBarHeight: 0,
        navBarTitleTop: 0,
    },

    onLoad: function() {
        // 关键修改：使用新的API获取系统信息
        const sysInfo = wx.getSystemInfoSync();
        const menuButton = wx.getMenuButtonBoundingClientRect();
        const navBarHeight = menuButton.top + menuButton.height + (menuButton.top - sysInfo.statusBarHeight);
        const navBarTitleTop = sysInfo.statusBarHeight + (menuButton.top - sysInfo.statusBarHeight);
        
        this.setData({
            navBarHeight: navBarHeight,
            navBarTitleTop: navBarTitleTop
        });

        this.updateTime();
        this.intervalId = setInterval(this.updateTime, 1000); 
    },

    onShow: function() {
        this.initializeRandomColors(); 
    },
    
    onHide: function() {
    },

    initializeRandomColors: function() {
        const gradientColors = [];
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * this.data.colors.length);
            gradientColors.push(this.data.colors[randomIndex]);
        }
        
        this.setData({
            lineColors: gradientColors,
        });
    },

    updateTime: function() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        const dateString = `${year}-${month}-${day}` + '\u00A0';
        const timeString = `${hours}:${minutes}:${seconds}` + '\u00A0';

        this.setData({
            currentDate: dateString,
            currentTime: timeString
        });
    },

    onUnload: function() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
});