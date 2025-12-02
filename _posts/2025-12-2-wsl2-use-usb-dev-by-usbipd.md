---
layout: post
title: "WSL2通过usbipd使用USB设备"
date: 2025-12-02
category: Linux
tags: [Linux, wsl2, usbipd]
toc: true
---

通过usbipd解决WSL2无法访问USB设备的问题。

## 安装usbipd

以管理员身份打开PowerShell：

```powershell
winget install --interactive --exact dorssel.usbipd-win
```

```powershell
usbipd wsl list
```

示例输出：

```powershell
PS C:\Users> usbipd list
Connected:
BUSID  VID:PID    DEVICE                                                        STATE
1-2    1366:0105  JLink CDC UART Port (COM12), J-Link driver                    Not shared
1-7    17ef:6100  USB 输入设备                                                  Not shared
1-8    17ef:608d  USB 输入设备                                                  Not shared
1-9    0483:374b  ST-Link Debug, USB 大容量存储设备, STMicroelectronics STL...  Not shared
1-14   0bda:4853  Realtek Bluetooth Adapter                                     Not shared
3-1    0403:6001  USB Serial Converter                                          Shared
3-4    0b95:1790  ASIX AX88179 USB 3.0 to Gigabit Ethernet Adapter              Shared
```

## 绑定USB设备至WSL2

通过插拔设备查看具体的USB端口，假设是3-4：

```powershell
usbipd bind --busid 3-4
usbipd attach --wsl --busid 3-4 --auto-attach
```

如果正常绑定后，USB的STATE会变为Shared，然后在WSL2中：

```bash
ls /dev/tty*
```

应该会看到类似`/dev/ttyUSB*`的输出，也可以通过插拔USB来判断是否正确绑定。

## 问题排查

```text
usbipd: error: WSL kernel is not USBIP capable; update with 'wsl --update'.
```

该问题需要升级WSL2内核，依次执行下列指令：

```powershell
wsl --status
wsl --update
wsl --shutdown
```

更新完之后重新执行attach进行绑定。


