---
layout: post
title: Android SDK 使用文档
category: android
---

本文档用于 Android 开发者在应用中整合果合移动广告 SDK。

## 配置果合 SDK

### SDK 文件内容

文件集中包含有：

<table>
	<thead>
		<tr>
			<th>文件名称</th>
			<th>文件内容</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Libs 文件夹</td>
			<td>果合 Android SDK 和平台广告 SDK</td>
		</tr>
		<tr>
			<td>Demo 文件夹</td>
			<td>果合 Android SDK 程序样例</td>
		</tr>
		<tr>
			<td>Adapters 文件夹</td>
			<td>广告平台 SDK 和果合提供的适配开放源码</td>
		</tr>
		<tr>
			<td>GuoHe_Integration_Android.pdf</td>
			<td>Android SDK更新日志（本文档）</td>
		</tr>
		<tr>
			<td>gh_closebutton.png</td>
			<td>关闭按钮图片</td>
		</tr>
	</tbody>
</table>

### 添加果合 SDK 文件到你的工程中

将文件集中的libs文件夹复制到项目工程的根目录下。

![添加 Jar](../images/android-add-libs.png)

![添加 Jar](../images/android-add-libs2.png)

## 在您的工程代码中使用果合SDK

### 添加相应文件

#### 添加 Adapter 文件

如果您只想开通品牌广告或者自主广告，请忽略此步骤。

![添加 Adapter](../images/android-add-adapter.png)

![添加 Adapter](../images/android-add-adapter2.png)

注：您也可以通过项目引用等方式引入需要的Adapter文件，该方法可以查看网上相关资料，此处不再赘述。

#### 添加关闭按钮图片

### 创建广告位

#### 用 XML 布局

在 XML 布局文件中适当位置添加如下代码创建广告位：

	<com.guohead.sdk.GHView android:id="@+id/mGHView_1" android:layout_height="wrap_content" android:layout_width="wrap_content"></com.guohead.sdk.GHView>

注：果合 Android SDK 1.1版本增加了广告位关闭按钮的设置，开发着在网站上创建/编辑广告位时可以为广告位设置关闭按钮样式为“广告位内”、“右上角”、“无”。

	GHView  ghView_1=new GHView(this);                             

将 ghView_1 添加到你想要的地方。

### 初始化广告位，请求广告

在 Java 文件中嵌入如下代码进行广告位的初始化：

	GHView ghView_1;

注意：

1. 将您在果合网站上获得到的广告位 ID，替换上述代码中的"广告位ID"。

当界面退出时，需停止广告位请求广告，应该在 Activity 的 onDestroy() 方法中调用 destroy() 方法。代码如下：

	protected void onDestroy() {

#### 添加权限

在 AndroidManifest.xml 文件的 </manifest> 标签前添加如下代码。

	<uses-permission android:name="android.permission.INTERNET" />

	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

注：若有疑问，请查看相关平台 SDK 开发文档。

#### 添加 Activity 声明

	<!-- youmi begin -->

可以根据需要对每个广告位的状态进行监听，以便做出相应的处理。果合SDK提供了完善的监听机制。

	ghView.setOnAdClickedListener(new OnAdClickedListener() 	{		

对应 Web 端提供的自定义定向功能(参见注解)，SDK 端提供用户为广告位设置自定义定向字段的方法。只需在相应的位置添加如下代码即可，对应的 Target Key 需要开发者定义。

	ghView.setKeywords("Target Key ");

自定义定向功能: 用以满足应用的特殊目标定向的需求 。用户可以在Web端为广告定义多个自定义定向字段(以逗号分隔，例如key1,key2)；在应用中，可以通过为广告位设置一个自定义定向字段(例如key1)对用户群做定向投放。规则举例: 广告A设置的自定义定向字段为key1,key2，用户群a设置的定向字段为key1，用户群b未设置定向字段，用户群c设置定向字段为key2，则a和c可以看到广告A，b则看不到。

## 附录：GHView 接口列表

<table>
	<tr>
		<td>startLoadAd()</td>
		<td>开始请求广告</td>
	</tr>
	<tr>
		<td>pauseLoadAd()</td>
		<td>暂停请求广告，即暂停广告之间的切换。（注意：如果使用平台广告，最后显示的广告平台SDK若有自动刷新逻辑，这个广告平台将会继续刷新它自己的广告。果合SDK只暂停果合广告平台或者平台广告的切换。）</td>
	</tr>
	<tr>
		<td>restartLoadAd()</td>
		<td>重新请求广告，即重新开始广告之间的切换。</td>
	</tr>
	<tr>
		<td>setAdUnitId("广告位ID ")</td>
		<td>在开始请求广告之前必须设置广告位ID才能正确请求广告。</td>
	</tr>
	<tr>
		<td>setOnxxxListener</td>
		<td>设置广告状态监听器，详情请看监听广告位状态。</td>
	</tr>
</table>