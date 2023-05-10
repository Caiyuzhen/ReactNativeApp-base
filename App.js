import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Keyboard } from 'react-native';

// export default function App() {
export default class APp extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			inputValue: '', //⚡️保存输入框的内容
			list: []
			// list: ['任务一', '任务二', '任务三']
		}

		// 🔥 绑定 this 的作用域指向
		this.handleTextChange = this.handleTextChange.bind(this)
		// this.handleBtnPress = this.handleBtnPress.bind(this)
	}


	// 发送 Ajax 请求, 在 RN 内发送请求就是 http 请求, 而不是 Ajax 请求，因为不是在浏览器内！！
	componentDidMount() {
		this.getListInfo()
	}

	getListInfo() {
		fetch('http://1.4/index.json')
			// http://www.abc.com/index.json
			.then((res) => res.json())
			.then((res) => {
				// alert(JSON.stringify(res))
				this.setState({
					list: res.data.list
				})
			})
			// .then((res) => {
			// 	alert(JSON.stringify(res))
			// })
	}


	// 处理输入框输入事件(🔥注意需要先在上方绑定作用域！)
	handleTextChange(e) {
		this.setState({
			inputValue: e // 输入什么就获取什么内容
		})
		// alert(e) //输入什么打印什么
	}

	handleBtnPress() {
		this.setState({
			list: [...this.state.list, this.state.inputValue], //🔥把上一次的内容展开，再加上这一次的内容
			inputValue: ''//🔥清空输入框
		})
		alert(this.state.list)
		// 关闭底部键盘
		Keyboard.dismiss()
		// alert('press')
	}


	render() {
		return (
			// View 类似 div
			<View style={styles.mainContainer}>
				<View style={styles.inputArea}>
					<TextInput 
						style={styles.input} 
						placeholder='Input something...' 
						placeholderTextColor='#716f6f'
						onChangeText={this.handleTextChange}
						value={this.state.inputValue} // 把 TextInput 跟 TextInput 做双向数据绑定
						// RN 中没有 onInput 事件
					></TextInput>
					<Button 
						style={styles.button} title='提交'
						onPress={ ()=>{this.handleBtnPress()} }// RN 中没有 onClick 事件, 此外箭头函数就不需要绑定 this 了
					></Button>
				</View>
				{/* 👇测试下边输入边获取数据 */}
				{/* <View>
					<Text>{this.state.inputValue}</Text>
				</View> */}
				{/* Text 内一定要放文本 */}
				<Text style={styles.mainTitle}>TodoList👋</Text>

				<View style={styles.list}>
				{/* <ScrollView style={styles.scrollContainer}> */}
						{
							this.state.list.map((item, index) => {
								return (
									<Text style={[styles.todoItem, styles.todoItemActivated]} key={index}>{item}</Text>
								)
							})
						}
					{/* </ScrollView> */}
				</View>
				<StatusBar style="auto" />
			</View>
		)
	}
}


//StyleSheet 是构建样式的工具，类似于 CSS 的样式表, 但本质不是 CSS, 本质是一个 JS 对象
const styles = StyleSheet.create({
	mainContainer: {
		marginTop: 44,
		height: '100%', // 手机的屏幕高度 vh
		gap: 10,
		alignItems: 'center',
		backgroundColor: '#5e4cff',
		// flexDirection: 'column',//RN 中默认为 column 而不是 row
	},
	inputArea: {
		width: '80%',
		display: 'flex',
		flexDirection: 'row', 
		zIndex: 10,
		height: 48,
		borderRadius: 8,
		marginTop: 40,
		marginBottom: 20,
		backgroundColor: '#e6e4ee',
		// backgroundColor: '#e6e4ee',
	},
	input: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		lineHeight: 16,
		fonSize: 16,
		paddingLeft: 10,
		color: '#333',
		paddingTop: 2,
		// backgroundColor: '#e6e4ee',
	},
	button: {
		// marginBottom: 20,
	},
	mainTitle: {
		fontSize: 28,
		fontWeight: 700,
		// backgroundColor: 'rgba(102, 102, 102, 0.4)',
	},
	list: {
		display: 'flex', // 默认为 flex 布局
		alignItems: 'center',
		// flex: 1, // 在 css3 中代表 1 1 0, 撑开父级剩余高度',
		// justifyContent: 'center',
	},
	todoItem: {
		fontSize: 20,
		backgroundColor: 'rgba(102, 102, 102, 0.4)',
	},
	todoItemActivated: {
		backgroundColor: 'rgba(255, 255, 255, 0)',
	}
});
