// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation of a triatomic molecule.
 * Children position themselves in world coordinates, so this node's offset should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // import
  var AtomNode = require( 'MOLECULE_POLARITY/common/view/AtomNode' );
  var BondNode = require( 'MOLECULE_POLARITY/common/view/BondNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeDragHandler = require( 'MOLECULE_POLARITY/common/view/MoleculeDragHandler' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PartialChargeNode = require( 'MOLECULE_POLARITY/common/view/PartialChargeNode' );

  /**
   * @param {TriatomicMolecule} molecule
   * @constructor
   */
  function TriatomicMoleculeNode( molecule ) {

    Node.call( this );

    // nodes
    var bondABNode = new BondNode( molecule.bondAB );
    var bondBCNode = new BondNode( molecule.bondBC );
    var atomANode = new AtomNode( molecule.atomA );
    var atomBNode = new AtomNode( molecule.atomB );
    var atomCNode = new AtomNode( molecule.atomC );
    var arrowsANode = new Node();//new BondAngleArrowsNode( molecule, molecule.atomA );
    var arrowsCNode = new Node();//new BondAngleArrowsNode( molecule, molecule.atomC );
    this.partialChargeNodeA = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bondAB );
    this.partialChargeNodeB = PartialChargeNode.createCompositePartialChargeNode( molecule.atomB, molecule );
    this.partialChargeNodeC = PartialChargeNode.createOppositePartialChargeNode( molecule.atomC, molecule.bondBC );
    this.bondDipoleABNode = new Node();//new BondDipoleNode( molecule.bondAB );
    this.bondDipoleBCNode = new Node();//new BondDipoleNode( molecule.bondBC );
    this.molecularDipoleNode = new Node();//new MolecularDipoleNode( molecule );

    // rendering order
    this.addChild( new Node( { children: [
      bondABNode, bondBCNode, // bonds behind atoms
      arrowsANode, arrowsCNode,
      atomANode, atomBNode, atomCNode
    ] } ) );
    this.addChild( new Node( { children: [
      this.partialChargeNodeA, this.partialChargeNodeB, this.partialChargeNodeC,
      this.bondDipoleABNode, this.bondDipoleBCNode, this.molecularDipoleNode
    ] } ) ); // decorations

    // rotate molecule by dragging bonds or atom B
    bondABNode.cursor = bondBCNode.cursor = atomBNode.cursor = 'pointer'; //TODO custom cursor, ala RotateCursorHandler in Java version
    bondABNode.addInputListener( new MoleculeDragHandler( molecule ) );
    bondBCNode.addInputListener( new MoleculeDragHandler( molecule ) );
    atomBNode.addInputListener( new MoleculeDragHandler( molecule ) );

    // change bond angles by dragging atom A or C
    atomANode.cursor = atomCNode.cursor = 'pointer';
    //TODO
//    atomANode.addInputListener( new BondAngleHandler( molecule, molecule.bondAngleA, atomANode, arrowsANode ) );
//    atomCNode.addInputListener( new BondAngleHandler( molecule, molecule.bondAngleC, atomCNode, arrowsCNode ) );

    // default state
    arrowsANode.visible = arrowsCNode.visible = false;
  }

  return inherit( Node, TriatomicMoleculeNode, {

    setBondDipolesVisible: function( visible ) {
      //TODO put all bond dipoles under 1 parent node
      this.bondDipoleABNode.visible = this.bondDipoleBCNode.visible = visible;
    },

    setMolecularDipoleVisible: function( visible ) {
      this.molecularDipoleNode.visible = visible;
    },

    setPartialChargesVisible: function( visible ) {
      //TODO put all partial charges under 1 parent node
      this.partialChargeNodeA.visible = this.partialChargeNodeB.visible = this.partialChargeNodeC.visible = visible;
    }
  } );
} );