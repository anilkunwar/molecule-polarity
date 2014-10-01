// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BondCharacterNode = require( 'MOLECULE_POLARITY/twoatoms/view/BondCharacterNode' );
  var DiatomicMoleculeNode = require( 'MOLECULE_POLARITY/twoatoms/view/DiatomicMoleculeNode' );
  var ElectronegativityControl = require( 'MOLECULE_POLARITY/common/view/ElectronegativityControl' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlateNode = require( 'MOLECULE_POLARITY/common/view/PlateNode' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SurfaceColorKey = require( 'MOLECULE_POLARITY/common/view/SurfaceColorKey' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var TwoAtomsControlPanel = require( 'MOLECULE_POLARITY/twoatoms/view/TwoAtomsControlPanel' );

  /**
   * @param {TwoAtomsModel} model
   * @constructor
   */
  function TwoAtomsView( model ) {

    var thisView = this;
    ScreenView.call( thisView, MPConstants.SCREEN_VIEW_OPTIONS );

    // view-specific properties
    var viewProperties = new PropertySet( {
      bondDipoleVisible: true,
      partialChargesVisible: false,
      bondCharacterVisible: false,
      surfaceType: SurfaceType.NONE
    } );

    // nodes
    var moleculeNode = new DiatomicMoleculeNode( model.molecule );
    var negativePlateNode = PlateNode.createNegative( model.eField );
    var positivePlateNode = PlateNode.createPositive( model.eField );
    var enControlA = new ElectronegativityControl( model.molecule.atomA, model.molecule );
    var enControlB = new ElectronegativityControl( model.molecule.atomB, model.molecule );
    var bondCharacterNode = new BondCharacterNode( model.molecule );
    var electrostaticPotentialColorKey = SurfaceColorKey.createElectrostaticPotentialRWBColorKey();
    var electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey();
    var controlPanel = new TwoAtomsControlPanel( viewProperties, model.eField.enabledProperty );
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      scale: 1.32
    } );


    // Parent for all nodes added to this screen
    var rootNode = new Node( { children: [
      // nodes are rendered in this order
      negativePlateNode,
      positivePlateNode,
      enControlA,
      enControlB,
      controlPanel,
      bondCharacterNode,
      electrostaticPotentialColorKey,
      electronDensityColorKey,
      moleculeNode,
      resetAllButton
    ] } );
    thisView.addChild( rootNode );

    // layout, based on molecule location ---------------------------------

    var moleculeX = model.molecule.location.x;
    var moleculeY = model.molecule.location.y;
    var plateXOffset = 250; // x offset from molecule

    // to left of molecule, vertically centered
    negativePlateNode.right = moleculeX - plateXOffset;
    negativePlateNode.y = moleculeY - ( negativePlateNode.plateHeight / 2 );

    // to right of molecule, vertically centered
    positivePlateNode.left = moleculeX + plateXOffset;
    positivePlateNode.y = moleculeY - ( positivePlateNode.plateHeight / 2 );

    // centered below molecule
    enControlA.right = moleculeX - 5;
    enControlB.left = moleculeX + 5;
    enControlA.bottom = enControlB.bottom = this.layoutBounds.bottom - 25;

    // centered above molecule
    electrostaticPotentialColorKey.centerX = electronDensityColorKey.centerX = moleculeX;
    electrostaticPotentialColorKey.top = electronDensityColorKey.top = 25;

    // centered above EN controls
    bondCharacterNode.centerX = moleculeX;
    bondCharacterNode.bottom = enControlA.top - 10;

    // to right of positive plate, top aligned
    controlPanel.top = positivePlateNode.y;
    controlPanel.left = positivePlateNode.right + 70;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // synchronization with view properties ------------------------------

    viewProperties.bondDipoleVisibleProperty.link( function( visible ) {
      moleculeNode.setBondDipoleVisible( visible );
    } );

    viewProperties.partialChargesVisibleProperty.link( function( visible ) {
      moleculeNode.setPartialChargesVisible( visible );
    } );

    viewProperties.bondCharacterVisibleProperty.linkAttribute( bondCharacterNode, 'visible' );

    viewProperties.surfaceTypeProperty.link( function( surfaceType ) {
      moleculeNode.setSurfaceType( surfaceType );
      electrostaticPotentialColorKey.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
      electronDensityColorKey.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
    } );
  }

  return inherit( ScreenView, TwoAtomsView );
} );