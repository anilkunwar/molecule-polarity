// Copyright 2017-2018, University of Colorado Boulder

/**
 * Dipole direction control that appears in the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var deltaMinusString = require( 'string!MOLECULE_POLARITY/deltaMinus' );
  var deltaPlusString = require( 'string!MOLECULE_POLARITY/deltaPlus' );
  var dipoleDirectionString = require( 'string!MOLECULE_POLARITY/dipoleDirection' );
  var patternDipoleDirectionString = require( 'string!MOLECULE_POLARITY/pattern.dipoleDirection' );

  // constants
  var TEXT_OPTIONS = {
    font: new PhetFont( 20 ),
    maxWidth: 300
  };
  var RADIO_BUTTON_OPTIONS = { radius: 8 };

  /**
   * @param {Property.<string>} dipoleDirectionProperty
   * @constructor
   */
  function DipoleDirectionControl( dipoleDirectionProperty ) {

    var dipoleDirectionLabel = new Text( dipoleDirectionString, {
      font: new PhetFont( 14 ),
      maxWidth: 400
    } );

    // d+ -> d-
    var positiveToNegativeString = StringUtils.fillIn( patternDipoleDirectionString, {
      from: deltaPlusString,
      to: deltaMinusString
    } );
    var positiveToNegativeButton = new AquaRadioButton(
      dipoleDirectionProperty,
      'positiveToNegative',
      new Text( positiveToNegativeString, TEXT_OPTIONS ),
      RADIO_BUTTON_OPTIONS
    );

    // d- -> d+
    var negativeToPositiveString = StringUtils.fillIn( patternDipoleDirectionString, {
      from: deltaMinusString,
      to: deltaPlusString
    } );
    var negativeToPositiveButton = new AquaRadioButton(
      dipoleDirectionProperty,
      'negativeToPositive',
      new Text( negativeToPositiveString, TEXT_OPTIONS ),
      RADIO_BUTTON_OPTIONS
    );

    VBox.call( this, {
      align: 'left',
      spacing: 10,
      children: [
        dipoleDirectionLabel,
        positiveToNegativeButton,
        negativeToPositiveButton
      ]
    } );

    // @private
    this.disposeDipoleDirectionControl = function() {
      positiveToNegativeButton.dispose();
      negativeToPositiveButton.dispose();
    };
  }

  moleculePolarity.register( 'DipoleDirectionControl', DipoleDirectionControl );

  return inherit( VBox, DipoleDirectionControl, {

    // @public
    dispose: function() {
      this.disposeDipoleDirectionControl();
      VBox.prototype.dispose.call( this );
    }
  } );
} );
