import React from 'react';
import {Route} from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {convertCollectionsSnapshotToMap, firestore} from '../../firebase/firebase.utils';
import {updateCollections} from '../../redux/shop/shop.actions';
import {connect} from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    state = {
        loading: true
    };

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
            this.setState({loading: false});
        });
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;

        return (<div className='shop-page'>
            <Route exact path={`${match.path}`}
                   render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/>}/>
            <Route path={`${match.path}/:collectionId`}
                   render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
        </div>);
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
