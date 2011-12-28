---
layout: post
title: 为什么我的 iOS 应用在嵌入果合 SDK 后无法编译？
category: ios
---

这个问题可能有很多种情况，常见的几种解决方法是：

1. JSON 框架重复，确保工程中只有一份 JSON 文件夹
2. 微云需要在应用程序 Target 的 Build Setting 里双击 Other Linker Flags，添加选项 -ObjC 和 -all_load，哇棒则不能添加

