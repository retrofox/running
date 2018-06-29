var length = require('length.js');
const { milliseconds, seconds, minutes, hours, days } = require('time-convert');
const timestring = require('timestring') 

class Running {
	constructor() {
		this.hms = { h: 0, m: 0, s: 0 };
		this.distHandler;
		this.timeInSeconds;
	}

	setDistance (dist) {
		const pairValueUnit = dist.match( /([\d\.]+)(\w*)/ );

		if ( pairValueUnit && pairValueUnit.length > 1 ) {
			this.distValue = Number(pairValueUnit[1]);
			this.distUnit = String(pairValueUnit[2]);

			this.distHandler = length( this.distValue, this.distUnit );
		}
	}

	// hh:mm:ss
	setTime(time) {
		const hms = time.split(':');
		hms.reverse();

		this.hms.s = parseInt(hms[0]);
		this.hms.m = hms[1] ? parseInt(hms[1]) : 0;
		this.hms.h = hms[2] ? parseInt(hms[2]) : 0;

		this.timeInSeconds = timestring( `${this.hms.h}h ${this.hms.m}m ${this.hms.s}s` );
	}

	pace(unit = 'min/km') {
		let dist;
		let pace;

		switch( unit ) {
			case 'min/km':
				dist = this.distHandler.to('km').value;
				pace = this.timeInSeconds / dist;
				break;

			case 'min/mi':
				dist = this.distHandler.to('mi').value;
				pace = this.timeInSeconds / dist;
				break;
		}

		return (
			seconds.to(minutes, seconds)(pace)
				.map( v => String(Math.round(v)).substr( 0, 2 ) )
				.join(':')
			) + unit;
	}
}

module.exports = Running;
