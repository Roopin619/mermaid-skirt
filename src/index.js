import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftBasicSingleDartedFront from './basicSingleDartedFront'
import draftBasicSingleDartedBack from './basicSingleDartedBack'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftBasicSingleDartedFront = draftBasicSingleDartedFront
Pattern.prototype.draftBasicSingleDartedBack = draftBasicSingleDartedBack

export default Pattern
