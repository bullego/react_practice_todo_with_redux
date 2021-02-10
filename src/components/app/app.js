import React, {Component} from 'react';
import Header from '../header';
import ItemStatusFilter from '../item-status-filter';
import Search from '../search';
import TodoList from '../todo-list';
import AddItem from '../add-item';
import './app.css';
import { connect } from 'react-redux';
import { getDealListTC,
				 updateDealStatusTC,
				 deleteDealTC,
				 createDealTC } from '../../redux/todo-reducer.js';
import { todoDataSelector } from '../../redux/todo-selectors.js';


class App extends Component {	
	state = {
		searchText: '',
		filter: 'all' // active | all(default) | done
	}

	componentDidMount() {
		this.props.getDeals();
	}
	
	addNewDeal = (text) => {
		this.props.createDeal(text);
	}
	
	onToggleImportant = (dealId) => {		
		this.props.changeDealStatus(dealId, 'important');
	}
	onToggleDone = (dealId) => {
		this.props.changeDealStatus(dealId, 'done');		
	};

	search(dealsArr, searchText) {
		if(searchText.length === 0) {
			return dealsArr;
		}
		
		return dealsArr.filter(deal => {
			return deal.dealName.toLowerCase().indexOf(searchText) > -1;
		});
	};

	onSearchHandler = (text) => {
		this.setState({searchText: text});
	};

	filter(dealsArr, filterName) {
		switch(filterName) {
			case 'all':
				return dealsArr;
			case 'active':
				return dealsArr.filter((el) => !el.done);
			case 'done':
				return dealsArr.filter((el) => el.done);
			default:
				return dealsArr;
		}
	}

	onFilterHandler = (filterName) => {
		this.setState({filter: filterName});
	}

	render() {
		const {todoData, deleteDeal} = this.props;
		const {searchText, filter} = this.state;
		const visibleDeals = this.filter(this.search(todoData, searchText), filter);
		
		const doneCount = todoData.filter((el) => el.done === true).length;
		const todoCount = todoData.length - doneCount;

		return (
			<div className="app">
				<Header toDo={todoCount} done={doneCount} />

				<Search onSearchHandler={this.onSearchHandler}/>
				
				<ItemStatusFilter	filter={filter}
													onFilterHandler={this.onFilterHandler} />

				<TodoList todos={visibleDeals}
									onDeleted={deleteDeal}
									toggleImportant={this.onToggleImportant}
									toggleDone={this.onToggleDone}/>

				<AddItem addNewDeal={this.addNewDeal}/>
			</div>
		);
	}
};

const mstp = state => {
	return {
		todoData: todoDataSelector(state)
	}
}

const mdtp = {
	getDeals: getDealListTC,
	changeDealStatus: updateDealStatusTC,
	deleteDeal: deleteDealTC,
	createDeal: createDealTC
}

export default connect(mstp, mdtp)(App);