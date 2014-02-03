// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base type for all 2D molecules.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Array<Atom>} atoms that make up the molecule
   * @param {Array<Bond>} bonds bonds between the atoms
   * @param {Function} updateAtomLocations
   * @param {Function} updatePartialCharges
   * @param {*} options
   * @constructor
   */
  function Molecule2( atoms, bonds, updateAtomLocations, updatePartialCharges, options ) {

    options = _.extend( {
      location: new Vector2( 0, 0 ), // the point about which the molecule rotates, in global model coordinate frame
      angle: 0 // angle of rotation of the entire molecule about the location, in radians
    }, options );

    var thisMolecule = this;

    thisMolecule.location = options.location;
    thisMolecule.angleProperty = new Property( options.angle );
    thisMolecule.atoms = atoms;
    thisMolecule.bonds = bonds;

    thisMolecule.dipoleProperty = new Property( new Vector2() ); // the molecular dipole
    thisMolecule.dragging = false; // true when the user is dragging the molecule

    // update atom locations when molecule is rotated
    thisMolecule.angleProperty.link( updateAtomLocations.bind( thisMolecule ) );

    // update molecular dipole when bond dipoles change
    thisMolecule.bonds.forEach( function( bond ) {
      bond.dipoleProperty.link( thisMolecule.updateMolecularDipole.bind( thisMolecule ) );
    } );

    // update partial charges when atoms' EN changes
    thisMolecule.atoms.forEach( function( atom ) {
      atom.electronegativityProperty.link( updatePartialCharges.bind( thisMolecule ) );
    } );
  }

  Molecule2.prototype = {

    reset: function() {
      this.angleProperty.reset();
      this.atoms.forEach( function( atom ) { atom.reset(); } );
    },

    // @private molecular dipole is the vector sum of the bond dipoles
    updateMolecularDipole: function() {
      var sum = new Vector2();
      this.bonds.forEach( function( bond ) { sum.add( bond.dipoleProperty.get() ); } );
      this.dipoleProperty.set( sum );
    }
  };

  return Molecule2;
} );