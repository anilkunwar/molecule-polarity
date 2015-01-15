// Copyright 2002-2015, University of Colorado Boulder

/**
 * User interface for setting global options in the 'Molecule Polarity' simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var dipoleDirectionString = require( 'string!MOLECULE_POLARITY/dipoleDirection' );
  var positiveToNegativeString = require( 'string!MOLECULE_POLARITY/positiveToNegative' );
  var negativeToPositiveString = require( 'string!MOLECULE_POLARITY/negativeToPositive' );
  var surfaceColorString = require( 'string!MOLECULE_POLARITY/surfaceColor' );

  // constants
  var CONTROL_TITLE_OPTIONS = { font: new PhetFont( 14 ) };
  var RADIO_BUTTON_OPTIONS = { radius: 8 };
  var COLOR_KEY_OPTIONS = {
    size: new Dimension2( 150, 15 ),
    titleVisible: false,
    rangeFont: new PhetFont( 8 ),
    xMargin: 0,
    ySpacing: 2
  };

  /**
   * @param {PropertySet} propertySet with properties 'dipoleDirection' and  'surfaceColor'
   * @constructor
   */
  function MPOptionsNode( propertySet ) {

    // dipole direction control
    var dipoleDirectionLabel = new Text( dipoleDirectionString, CONTROL_TITLE_OPTIONS );
    var dipoleDirectionProperty = propertySet.dipoleDirectionProperty;
    var positiveToNegativeButton = new AquaRadioButton(
      dipoleDirectionProperty,
      'positiveToNegative',
      new Text( positiveToNegativeString, { font: new PhetFont( 20 ) } ),
      RADIO_BUTTON_OPTIONS
    );
    var negativeToPositiveButton = new AquaRadioButton(
      dipoleDirectionProperty,
      'negativeToPositive',
      new Text( negativeToPositiveString, { font: new PhetFont( 20 ) } ),
      RADIO_BUTTON_OPTIONS
    );
    var dipoleDirectionControl = new LayoutBox( {
      orientation: 'vertical',
      align: 'left',
      spacing: 10,
      children: [
        dipoleDirectionLabel,
        positiveToNegativeButton,
        negativeToPositiveButton
      ]
    } );

    // surface color control
    var surfaceColorLabel = new Text( surfaceColorString, CONTROL_TITLE_OPTIONS );
    var surfaceColorProperty = propertySet.surfaceColorProperty;
    var rwbButton = new AquaRadioButton(
      surfaceColorProperty,
      'RWB',
      SurfaceColorKey.createElectrostaticPotentialRWBColorKey( COLOR_KEY_OPTIONS ),
      RADIO_BUTTON_OPTIONS
    );
    var roygbButton = new AquaRadioButton(
      surfaceColorProperty,
      'ROYGB',
      SurfaceColorKey.createElectrostaticPotentialROYGBColorKey( COLOR_KEY_OPTIONS ),
      RADIO_BUTTON_OPTIONS
    );
    var surfaceColorControl = new LayoutBox( {
      orientation: 'vertical',
      align: 'left',
      spacing: 10,
      children: [
        surfaceColorLabel,
        rwbButton,
        roygbButton
      ]
    } );

    // container for all controls
    LayoutBox.call( this, {
      orientation: 'vertical',
      align: 'left',
      spacing: 25,
      children: [
        dipoleDirectionControl,
        surfaceColorControl
      ]
    } );
  }

  return inherit( LayoutBox, MPOptionsNode );
} );