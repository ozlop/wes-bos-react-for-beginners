import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes"
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };

    static propTypes = {
        match: PropTypes.object,
    };

    componentDidMount() {
        const { params } = this.props.match;
        // Reinstate local storage
        const localStorageRef = localStorage.getItem(params.storeId);

        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)})
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        // 1. Take copy of the existing fishes state object
        const fishes = {...this.state.fishes};
        // 2. Add our new fish to the fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state
        this.setState({ fishes })
    };

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current state
        const fishes = { ...this.state.fishes };
        // 2. Update that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        // 1. Take a copy of state
        const fishes = { ...this.state.fishes };
        // 2. Update the state
        fishes[key] = null;
        // 3. Update state
        this.setState({ fishes })
    };

    loadSamplesFishes = () => {
        this.setState({ fishes: sampleFishes })
    };

    addToOrder = (key) => {
        // 1. Take a copy of state
        const order = { ...this.state.order };
        // 2. Either add to the order, or update the number in the order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update our state object
        this.setState({ order });
    };
    deleteFromOrder = (key) => {
        // 1. Take a copy of state
        const order = { ...this.state.order };
        // 2. Remove fish from order
        delete order[key];
        // 3. Update state
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    deleteFromOrder={this.deleteFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSamplesFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;
