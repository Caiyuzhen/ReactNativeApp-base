import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Keyboard, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

// export default function App() {
export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isBtnPress: false, //保存按钮的状态
			inputValue: '', //⚡️保存输入框的内容
			list: []
			// list: ['任务一', '任务二', '任务三']
		}

		// 🔥 绑定 this 的作用域指向
		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleTodoDelete = this.handleTodoDelete.bind(this)
		// this.handleBtnPress = this.handleBtnPress.bind(this)
	}


	// 发送 Ajax 请求, 在 RN 内发送请求就是 http 请求, 而不是 Ajax 请求，因为不是在浏览器内！！
	componentDidMount() {
		this.getListInfo()
	}

	getListInfo() {
		fetch('http://.1.4/index.json')
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


	// 获取输入框的内容 (🔥注意需要先在上方绑定作用域！)
	handleTextChange(e) {
		this.setState({
			inputValue: e // 输入什么就获取什么内容
		})
		// alert(e) //输入什么打印什么
	}

	// 把输入框的内容添加到列表中
	handleBtnPress() {
		if(this.state.inputValue !== undefined && this.state.inputValue !== '') {
			// 方案二(🔥防止错误, 比较标准的写法, 确保这次的 preState 就是上次的 preState！):
			this.setState((prevState) => ({ //如果依赖于上一次数据的话, 这样写比较好, 🔥 因为 preData 会先 = this.state
				list: [...prevState.list, prevState.inputValue],
				inputValue: ''
			}))
			// 方案一:
			// this.setState({
			// 	list: [...this.state.list, this.state.inputValue], //🔥把上一次的内容展开，再加上这一次的内容
			// 	inputValue: ''//🔥清空输入框
			// })
		}
		// alert(this.state.list)
		Keyboard.dismiss()// 关闭底部键盘
		// alert('press')
	}


	// delete 按钮被点击的业务
	handleTodoDelete (index) {
		const newList = [...this.state.list] //🔥🔥复制一份数组
		newList.splice(index, 1)// 删除掉对应的 todo -> index, 1 表示删除 1 个

		this.setState({
			list: newList
		})
	}


	// add 按钮被点击时的样式
	handleBtnPressIn = () => {
		this.setState({
			isBtnPress: true
		})
	}

	// add 按钮抬手时的样式
	handleBtnPressOut = () => {
		this.setState({
			isBtnPress: false
		})
	}

	
	render() {

		const { isBtnPress } = this.state //🔥🔥获取是否按下按钮的状态
		const buttonStyle = isBtnPress ? styles.buttonPress : styles.button // 按下时的样式

		return (
			// View 类似 div
			<View style={styles.mainContainer}>
				{/* 标题 */}
				<Text style={styles.mainTitle}>TodoList👋</Text>
				{/* 👇测试下边输入边获取数据 */}
				{/* <View>
					<Text>{this.state.inputValue}</Text>
				</View> */}
				{/* Text 内一定要放文本 */}

				{/* 输入框 */}
				<View style={styles.inputArea}>
					<TextInput 
						style={styles.input} 
						placeholder='Input something...' 
						placeholderTextColor='#716f6f'
						onChangeText={this.handleTextChange}
						value={this.state.inputValue} // 把 TextInput 跟 TextInput 做双向数据绑定
						underlineColorAndroid='#fff'//去掉安卓机下的下划线 underlineColorAndroid
						onBlur={Keyboard.dismiss}
						// RN 中没有 onInput 事件
					></TextInput>
					
					{/* 🔥TouchableHighlight 上有 onPress 事件 */}
					<TouchableWithoutFeedback 
						onPress={ ()=>{this.handleBtnPress()}}
						onPressIn={this.handleBtnPressIn} // 当按钮被按下时调用
						onPressOut={this.handleBtnPressOut} // 当按钮释放时调用
						// underlayColor="#5e4cff" // 自定义按下时的背景颜色
						>
						<View style={buttonStyle} title='Send'
							// onPress={ ()=>{this.handleBtnPress()} }// RN 中没有 onClick 事件, 此外箭头函数就不需要绑定 this 了
						>
							<Text style={styles.btnText}>Send</Text>	
						</View>
					</TouchableWithoutFeedback>

				</View>

				<ScrollView style={styles.list}>
				{/* <ScrollView style={styles.scrollContainer}> */}
						{
							this.state.list.map((item, index) => {
								return (
									<View style={styles.todoItemContainer} >
										<Text style={[styles.todoItem, styles.todoItemActivated]}>{item}</Text>
										{/* 删除按钮 */}
										<TouchableWithoutFeedback
											onPress={() => this.handleTodoDelete(index) }//传入 index, 用于删除对应的 item
										>
											{/* 内部最好不是直接就是 Text */}
											<View><Text style={styles.deleteBtn}>删除</Text></View>
										</TouchableWithoutFeedback>
									</View>
								)
							})
						}
					{/* </ScrollView> */}
				</ScrollView>
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
	mainTitle: {
		fontSize: 28,
		fontWeight: 700,
		marginTop: 40,
	},
	inputArea: {
		width: '80%',
		display: 'flex',
		flexDirection: 'row', 
		zIndex: 10,
		height: 48,
		borderRadius: 8,
		marginTop: 16,
		marginBottom: 20,
		backgroundColor: '#e6e4ee',
		// backgroundColor: '#e6e4ee',
	},
	input: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		lineHeight: 16,
		fontSize: 16,
		paddingLeft: 10,
		color: '#333',
		paddingTop: 2,
		// backgroundColor: '#e6e4ee',
	},
	buttonPress: {
		width: 68,
		height: '80%',
		marginTop: 5,
		marginRight: 5,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#381db4',
		borderRadius: 6,
	},
	button: {
		width: 68,
		height: '80%',
		marginTop: 5,
		marginRight: 5,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#552fff',
		borderRadius: 6,
	},
	deleteBtn: {
		fontSize: 14,
		color: '#ff42c0',
		fontWeight: 500,
	},
	btnText: {
		fontSize: 14,
		fontWeight: 700,
		color: '#ffffff'
	},
	list: {
		display: 'flex', // 默认为 flex 布局
		// alignItems: 'center',
		width: '100%',
		// flex: 1, // 在 css3 中代表 1 1 0, 撑开父级剩余高度',
		// justifyContent: 'center',
	},
	todoItemContainer: {
		display: 'flex',
		flexDirection: 'row',
		// 两头对齐顶边对齐
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		padding: 8,
		paddingLeft: 40,
		paddingRight: 44,
	},
	todoItem: {
		// 文字不折行
		fontSize: 18,
		backgroundColor: 'rgba(102, 102, 102, 0.4)',
	},
	todoItemActivated: {
		backgroundColor: 'rgba(255, 255, 255, 0)',
	}
});
