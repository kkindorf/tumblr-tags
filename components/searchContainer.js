var React = require('react');
var SearchCard = require('./searchCard').ASearchCard;
var actions = require('../actions');
var connect = require('react-redux').connect;
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
var tumblrResults = [];
var hideButton;
var SearchContainer = React.createClass({
    componentDidMount: function(){
        this.props.dispatch(actions.fetchDbData(this.props.dbData.skip))
        
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
            console.log(item.post_url)
            if(!item.photos){
                return;
            }else{
                return (
                    <SearchCard blogName = {item.blog_name}
                            src = {item.photos[0].alt_sizes[1].url}  
                            summary = {item.summary}
                            postUrl = {item.post_url}
                            
                                                        />
                )
            }
            
        })
        return(
            <div className="search-cards-flex">
            <div className={hideButton}>
             <Link to= {'/savedposts'}>
                    <button type="button" onClick={this.onClick} className="btn btn-default">Saved Posts</button>
            </Link>
            </div>
                <div className="col-xs-12">
                    <form onSubmit={this.onSubmit}>
                        <input type="text" className="form-control" ref='input'  placeholder=" Search for gif, Bill Murray, Batman, Smithsonian..."/>
                    </form>
                </div>
                
                {tumblrResults}
            </div>    
        )
    }
})

var mapStateToProps = function(state, props){
    return{
        tumblrDataResponse: state.tumblrDataResponse,
        dbData: state.dbData
    }
}
exports.ASearchContainer = connect(mapStateToProps)(SearchContainer)
exports.SearchContainer = SearchContainer;
/*var Container = connect(mapStateToProps)(SearchContainer)
module.exports = Container;
module.exports = SearchContainer;*/