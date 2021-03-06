// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model of a bond between 2 atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Atom} atom1
   * @param {Atom} atom2
   * @constructor
   */
  function Bond( atom1, atom2 ) {

    var self = this;

    // @public (read-only)
    this.atom1 = atom1;
    this.atom2 = atom2;

    // @public dispose not needed, exists for the lifetime of the sim
    this.dipoleProperty = new DerivedProperty( [
        atom1.locationProperty, atom2.locationProperty,
        atom1.electronegativityProperty, atom2.electronegativityProperty,
        MPConstants.GLOBAL_OPTIONS.dipoleDirectionProperty
      ],
      function( location1, location2, electronegativity1, electronegativity2, dipoleDirection ) {

        var deltaEN = electronegativity2 - electronegativity1;

        // this is a simplification. in reality, magnitude is a function of deltaEN and many other things.
        var magnitude = Math.abs( deltaEN );

        var angle = self.getAngle();
        if ( deltaEN < 0 ) {
          angle += Math.PI;
        }

        var dipole = Vector2.createPolar( magnitude, angle );

        // The above algorithm is for a dipole that points from positive to negative charge.
        // For IUPAC convention, the direction of the dipole is from negative to positive charge,
        // so rotate the dipole 180 degrees. See issue #5 and #56.
        if ( dipoleDirection === 'negativeToPositive' ) {
          dipole.rotate( Math.PI );
        }
        
        return dipole;
      }
    );
  }

  moleculePolarity.register( 'Bond', Bond );

  return inherit( Object, Bond, {

    /**
     * Gets the center of the bond, the midpoint between the 2 atom locations.
     * @returns {Vector2}
     * @public
     */
    getCenter: function() {
      return this.atom1.locationProperty.get().average( this.atom2.locationProperty.get() );
    },

    /**
     * Gets the angle of atom2 relative to the horizontal axis.
     * @returns {number} angle in radians
     * @public
     */
    getAngle: function() {
      var center = this.getCenter();
      return Math.atan2( this.atom2.locationProperty.get().y - center.y, this.atom2.locationProperty.get().x - center.x );
    },

    /**
     * Gets the bond length, the distance between the 2 atoms.
     * @returns {number}
     * @public
     */
    getLength: function() {
      return this.atom1.locationProperty.get().distance( this.atom2.locationProperty.get() );
    }
  } );
} );