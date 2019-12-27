import React from 'react';
import { Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
	container: {
		overflow: 'hidden',
	},
} );

export default class ExpandingRow extends React.Component {
	static defaultProps = {
		height: 100,
		duration: 250,
	};

	state = {
		childrenVisible: false,
		progress: new Animated.Value( 0 ),
	};

	onExpand() {
		this.setState( { childrenVisible: true } );
		Animated.timing(
			this.state.progress,
			{
				toValue: 1,
				duration: this.props.duration,
			},
		).start();
	}

	onCollapse() {
		Animated.timing(
			this.state.progress,
			{
				toValue: 0,
				duration: this.props.duration,
			},
		).start( status => {
			if ( status.finished ) {
				this.setState( { childrenVisible: false } );
			}
		} );
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.expanded !== this.props.expanded ) {
			if ( this.props.expanded ) {
				this.onExpand();
			} else  {
				this.onCollapse();
			}
		}
	}

	render() {
		const { childrenVisible, progress } = this.state;

		const style = {
			...styles.container,
			opacity: progress,
			height: progress.interpolate( {
				inputRange: [ 0, 1 ],
				outputRange: [ 0, this.props.height ],
			} ),
		};

		return (
			<Animated.View style={ style }>
				{ childrenVisible && this.props.children }
			</Animated.View>
		);
	}
}
