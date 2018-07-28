import { connect } from 'react-redux'

import WidgetList from '../components/WidgetList'

const mapStateToProps = state => ({
    widgets: [{text: 'Heading'}, {text: 'List'}]
})

// const mapStateToProps = state => console.log('REEEEE', state)

const WidgetListContainer = connect(mapStateToProps)(WidgetList)

export default WidgetListContainer