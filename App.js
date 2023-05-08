import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

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
		fetch('http://.1.4/index.json')
			.then((res) => res.json())
			.then((res) => {
				alert(JSON.stringify(res))
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
			<View style={styles.container}>
				{/* Text 内一定要放文本 */}
				<Text style={styles.mainTitle}>你好👋</Text>
				<ScrollView>
					{
						this.state.list.map((item, index) => {
							return (
								<Text style={styles.todoListItem} key={index}>{item}</Text>
							)
						})
					}
				</ScrollView>
				<StatusBar style="auto" />
			</View>
		)
	}
}


//StyleSheet 是构建样式的工具，类似于 CSS 的样式表
const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
		backgroundColor: '#5e4cff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	mainTitle: {
		fontSize: 28,
		fontWeight: 700,
		textAlign: 'left',
	},
	todoListItem: {
		fontSize: 20,
		textAlign: 'left',
		lineHeight: 40,
	}
});
