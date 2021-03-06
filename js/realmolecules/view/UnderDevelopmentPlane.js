// Copyright 2017, University of Colorado Boulder

//TODO Delete when the Real Molecules screen is completed, see #32
/**
 * Used to disable the 'Real Molecules' screen and display a message indicating that it's under development.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Plane = require( 'SCENERY/nodes/Plane' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var underDevelopmentLine1String = require( 'string!MOLECULE_POLARITY/underDevelopment.line1' );
  var underDevelopmentLine2String = require( 'string!MOLECULE_POLARITY/underDevelopment.line2' );

  // constants
  var LEGACY_URL = 'https://phet.colorado.edu/en/simulation/legacy/molecule-polarity';

  /**
   * @constructor
   */
  function UnderDevelopmentPlane( layoutBounds ) {

    var linkText = StringUtils.fillIn( '<a href="{{href}}">{{text}}</a>', {
      href: LEGACY_URL,
      text: LEGACY_URL
    } );

    var maxTextWidth = 0.75 * layoutBounds.width;

    var vBox = new VBox( {
      align: 'left',
      spacing: 20,
      children: [
        new Text( underDevelopmentLine1String, {
          font: new PhetFont( 22 ),
          maxWidth: maxTextWidth
        } ),
        new VBox( {
          align: 'left',
          children: [
            new Text( underDevelopmentLine2String, {
              font: new PhetFont( 16 ),
              maxWidth: maxTextWidth
            } ),
            new RichText( linkText, {
              links: true, // allow links in linkText
              font: new PhetFont( 16 ),
              maxWidth: maxTextWidth
            } )
          ]
        } )
      ]
    } );

    var panel = new Panel( vBox, {
      cornerRadius: 10,
      xMargin: 25,
      yMargin: 50,
      fill: 'white',
      stroke: 'black',
      center: layoutBounds.center
    } );

    Plane.call( this, {
      children: [ panel ],
      fill: 'rgba( 0, 0, 0, 0.2 )',
      pickable: true // blocks interaction with anything behind this Plane
    } );
  }

  moleculePolarity.register( 'UnderDevelopmentPlane', UnderDevelopmentPlane );

  return inherit( Plane, UnderDevelopmentPlane );
} );
