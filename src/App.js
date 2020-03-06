import React from 'react';
import superagent from 'superagent'
import { connect } from 'react-redux'

class App extends React.Component {
  state = {
    text: ''
  }

  stream = new EventSource('https://warm-wildwood-83333.herokuapp.com/stream')

  componentDidMount() {

    this.stream.onmessage = (event) => {
      // console.log('event.data test:', event.data);
      const parsed = JSON.parse(event.data)
      this.props.dispatch(parsed)
      // console.log("this.props here:", this.props);
      // console.log('parsed test:', parsed);
    }
  }

  onSubmit = async event => {
    event.preventDefault()

    try {
      const response = await superagent
        .post('https://warm-wildwood-83333.herokuapp.com/message')
        .send({ text: this.state.text })

      console.log('onSubmit response:', response)
    } catch (error) {
      console.error(error)
    }
  }

  onChange = event => {
    this.setState({
      text: event.target.value
    })
  }

  reset = () => {
    this.setState({ text: '' })
  }

  render() {
    const messages = this
      .props
      .messages
      .map(message => <p>{message}</p>)
    return <main>
      <form onSubmit={this.onSubmit}>
        <input
          type='text'
          onChange={this.onChange}
          value={this.state.text}
        />
        <button>Send</button>

        <button onClick={this.reset}>
          Reset
          </button>
      </form>
      {messages}
    </main>
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps)(App)