// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPModel = require( 'MOLECULE_POLARITY/common/model/MPModel' );
  var TriatomicMolecule = require( 'MOLECULE_POLARITY/threeatoms/model/TriatomicMolecule' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function ThreeAtomsModel() {
    MPModel.call( this, new TriatomicMolecule( { location: new Vector2( 400, 280 ) } ) );
  }

  moleculePolarity.register( 'ThreeAtomsModel', ThreeAtomsModel );

  return inherit( MPModel, ThreeAtomsModel );
} );
