* * * 
layout: post
title: 果合 iOS SDK 使用文档
category: ios
* * * 

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
			<td>GuoHe SDK</td>
			<td>果合 SDK</td>
		</tr>
		<tr>
			<td>Demo_Application</td>
			<td>果合 SDK 程序样例</td>
		</tr>
		<tr>
			<td>Network_SDK_Adapters</td>
			<td>广告平台SDK和果合提供的适配开放源码</td>
		</tr>
		<tr>
			<td>GuoHe_Integration_iOS.pdf</td>
			<td>果合 iOS SDK 使用文档（本文档）</td>
		</tr>
		<tr>
			<td>Changelog.pdf</td>
			<td>果合iOS SDK更新日志</td>
		</tr>
	</tbody>
</table>

### 添加果合 SDK 文件到你的工程中

将 GuoHeSDK (支持iOS 4.0以上) 目录引用到您的应用工程中，如下图，GuoHeSDK 文件夹中的 TouchJSON, ASIHTTPRequest, Reachability 为开源框架，如果您的应用中已经含有，将其删除掉。
如果引用到 ASIHTTPRequest, Reachability 框架，需要在应用程序Target的Build Setting 里选择Header Search Paths ，并键入:
	${SDK_DIR}/usr/include/libxml2
如果要在程序中支持平台广告(Admob等广告平台提供的广告)，请选择Network_SDK_Adapters目录中相应的广告平台文件夹，并引用到您的应用工程中。
![添加果合SDK](../images/ios* add* sdk.png)

### 添加相应的framework

编译GuoHeSDK中的文件需要引用相应的framework，请添加如下framework，如果您的应用中已经含有，则不需重复添加：

* UIKit.framework
* Foundation.framework
* CoreGraphics.framework
* QuartzCore.framework
* CFNetwork.framework
* CoreLocation.framework                  
* SystemConfiguration.framework
* MobileCoreServices.framework   
* libxml2.dylib
* libz.dylib

如果需要支持平台广告(即 Network_SDK_Adapter 目录)，需要额外引用各个平台广告所需的 framework 列举如下，如果您的应用中已经含有，不需重复添加:

<table>
	<thead>
		<tr>
			<th>广告平台</th>
			<th>所需添加的框架</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>AdMob</td>
			<td>
				<ul>
					<li>AudioToolbox.framework</li>
					<li>MessageUI.framework</li>
					<li>MediaPlayer.framework</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>有米</td>
			<td>
				<ul>
					<li>CoreTelephony.framework</li>
					<li>ImageIO.framework</li>
					<li>MapKit.framework</li>
					<li>MessageUI.framework</li>
					<li>libsqlite3.0.dylib</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>多盟</td>
			<td>
				<ul>
					<li>CoreTelephony.framework</li>
、					<li>MessageUI.framework</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>安沃</td>
			<td>
				<ul>
					<li>MapKit.framework</li>
					<li>MessageUI.framework</li>
					<li>MediaPlayer.framwork</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>InMobi</td>
			<td>
				<ul>
					<li>MessageUI.framework</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>iAd</td>
			<td>
				<ul>
					<li>iAd.framework</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>SmartMad 亿动智道</td>
			<td>
				<ul>
					<li>AudioToolbox.framework</li>
					<li>AVFoundation.framework</li>
					<li>CoreMotion.framework</li>
					<li>CoreTelephony.framework</li>
					<li>MediaPlayer.framwork</li>
					<li>libsqlite3.0.dylib</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>Vpon</td>
			<td>
				<ul>
					<li>Security.framework</li>
					<li>MessageUI.framework</li>
					<li>MapKit.framework</li>					
					<li>CoreMedia.framework</li>
					<li>CoreVideo.framework</li>
					<li>AudioToolbox.framework</li>
					<li>AVFoundation.framework</li>
					<li>AddressBook.framework</li>
					<li>MobileCoreServices.framework</li>				
					<li>CoreData.framework</li>
					<li>CoreTelephony.framework</li>
					<li>CoreFoundation.framework</li>
					<li>libiconv.dylib</li>
					<li>libsqlite3.0.dylib</li>
				</ul>
				Vpon 添加使用 Apon (用于地理定位，便于广告精准投放) 请参考：<a href="http://wiki.vpon.com/w/index.php?title=IPhone_Apon_SDK_%E6%89%8B%E5%86%8A" target="_blank">Vpon 参考文档</a>
				由于 Vpon 广告平台当前版本的 SDK 没有提供广告点击时调用的接口和广告内容窗口关闭时调用的接口，因此在果合上无法记录相应数据，但不影响在该广告平台上的数据。
			</td>
		</tr>
		<tr>
			<td>微云</td>
			<td>
				<ul>
					<li>MediaPlayer.framework</li>
				</ul>
				需要在应用程序 Target 的 Build Setting 里双击 Other Linker Flags，添加选项 -ObjC 和 -all_load。
				由于微云（WiYun）广告平台当前版本的SDK配置与哇棒（Wooboo）广告平台有冲突，所以两个广告平台不能同时使用。
				由于微云（WiYun）广告平台当前版本的SDK没有提供广告点击时调用的接口和广告内容窗口关闭时调用的接口，因此在果合上无法记录相应数据，但不影响在该广告平台上的数据。
				
			</td> 
		</tr>
		<tr>
			<td>哇棒</td>
			<td>
				<ul>
					<li>MessageUI.framework</li>
					<li>MapKit.framework</li>					
					<li>MediaPlayer.framework</li>
				</ul>
				由于哇棒（Wooboo）广告平台当前版本的SDK没有提供广告点击时调用的接口和广告内容窗口关闭时调用的接口，因此在果合上无法记录相应数据，但不影响在该广告平台上的数据。
			</td> 
		</tr>
		<tr>
			<td>Millennial Media</td>
			<td>
				<ul>
					<li>MediaPlayer.framework</li>
					<li>AudioToolbox.framework</li>
					<li>AVFoundation.framework</li>
				</ul>
			由于 Millennial Media 广告平台当前版本的SDK配置与哇棒（Wooboo）广告平台有冲突，所以两个广告平台不能同时使用。
			</td> 
		</tr>
		
	</tbody>

</table>
