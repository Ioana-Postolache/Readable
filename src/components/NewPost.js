import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddPost } from '../actions/posts'

class NewPost extends Component{

  state = {
    text1: '',
    text2: '',
    toHome: false
  }

  handleSubmit = ( event )=>{
    event.preventDefault()
    const { text1, text2 } = this.state
    const { dispatch } = this.props

    dispatch( handleAddPost( text1, text2 ) )

    this.setState({
      text1: '',
      text2: '',
      toHome: true
    })
  }

  handleChange = ( event ) => {
    const text = event.target.value
    const option = event.target.name
    if(option==='textarea1'){
      this.setState({
         text1: text
      })
    } else {
      this.setState({
         text2: text
      })
    }
 }

  render() {
    const { text1, text2, toHome } = this.state


    if ( authedUser === true ){
      return <Redirect to =  '/SignInPage'/>
    }

    if ( toHome === true ){
      return <Redirect to =  '/'/>
    }

    return(
      <div className="ui segment">
        <h3 className="ui block header">Would you rather...</h3>
        <form className='ui form' onSubmit={this.handleSubmit}>
           <div className="two fields">
               <div className="field">
                   <input
                     type="text"
                     name='textarea1'
                     placeholder='Enter option one here'
                     value={text1}
                     onChange={this.handleChange}
                     className='textarea'
                    />
              </div>
              <div className="field">
                   <input
                     name='textarea2'
                     type="text"
                     placeholder='Enter option two here'
                     value={text2}
                     onChange={this.handleChange}
                     className='textarea'
                   />
              </div>
          </div>
          <button
             className='ui secondary button'
             type='submit'
             disabled={ text1===''  || text2==='' }
           >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser}) {
  return { authedUser }
}
export default connect(mapStateToProps)(NewPost)
