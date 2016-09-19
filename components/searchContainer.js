var React = require('react');
var SearchCard = require('./searchCard');
var actions = require('../actions');
var connect = require('react-redux').connect;
var tumblrResults = [];

var SearchContainer = React.createClass({
    componentDidMount: function(){
        this.props.dispatch(actions.fetchTumblrData('Justin Bieber gifs'))
    },
    onSubmit: function(e){
        e.preventDefault();
        var query = this.refs.input.value;
        console.log(query)
        this.props.dispatch(actions.fetchTumblrData(query))
       this.refs.input.value ='';
    },
    render: function(){
        tumblrResults = this.props.tumblrDataResponse.map(function(item, id){
            if(!item.photos){
                return;
            }else{
                return (
                    <SearchCard blogName = {item.blog_name}
                            src = {item.photos[0].alt_sizes[1].url}  
                            summary = {item.summary}
                            timeStamp = {item.timestamp}
                            
                                                        />
                )
            }
            
        })
        return(
            <div>
               
                <div className="col-xs-12">
                    <form onSubmit={this.onSubmit}>
                    <input type="text" className="form-control" ref='input'  placeholder=" Search for gif, Bill Murray, Batman, Smithsonian..."/>
                    </form>
                </div>
                <div>
                {tumblrResults}
              </div>
            </div>    
        )
    }
})

var mapStateToProps = function(state, props){
    return{
        tumblrDataResponse: state.tumblrDataResponse
    }
}

var Container = connect(mapStateToProps)(SearchContainer)
module.exports = Container;