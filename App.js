import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';

// export default function App() {
export default class APp extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			inputValue: '',
			list: []
			// list: ['任务一', '任务二', '任务三']
		}
	}


	// 发送 Ajax 请求, 在 RN 内发送请求就是 http 请求, 而不是 Ajax 请求，因为不是在浏览器内！！
	componentDidMount() {
		this.getListInfo()
	}

	getListInfo() {
		fetch('http://192.168.1.4/index.json')
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


	render() {
		return (
			// View 类似 div
			<View style={styles.mainContainer}>
				<View style={styles.inputArea}>
					<TextInput style={styles.input} placeholder='Input something...' placeholderTextColor='#716f6f'></TextInput>
				</View>
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
		// flexDirection: 'column',//RN 中默认为 column 而不是 row
		backgroundColor: '#5e4cff',
	},
	inputArea: {
		height: 60,
		// backgroundColor: '#e6e4ee',
	},
	input: {
		height: '10%',2
		lineHeight: 20,
		fonSize: 116,
		padding: 10,
		color: '#333',
		paddingTop: 30,
		backgroundColor: '#e6e4ee',
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
