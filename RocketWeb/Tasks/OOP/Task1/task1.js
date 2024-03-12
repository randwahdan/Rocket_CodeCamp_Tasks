// Base class
class Car {
    constructor(make, model) {
    this.make = make;
    this.model = model;
    this.isEngineRunning = false;
    }
    
    startEngine() {
    this.isEngineRunning = true;
    console.log(`${this.make} ${this.model}'s engine is starting...`);
    }
    
    stopEngine() {
    this.isEngineRunning = false;
    console.log(`${this.make} ${this.model}'s engine is stopping...`);
    }
    
    drive() {
    console.log(`${this.make} ${this.model} is moving.`);
    }
    
    reverse() {
        console.log(`${this.make} ${this.model} is moving in reverse.`);
    }
    }
    
    class ElectricCar extends Car {
    constructor(make, model, batteryCapacity) {
    super(make, model);
    this.batteryCapacity = batteryCapacity;
    this.currentBatteryLevel = 100; 
    }

    chargeBattery() {
    console.log(`${this.make} ${this.model}'s battery is charging...`);
    this.currentBatteryLevel = 100;
    }
    
    drive() {
    if (this.isEngineRunning) {
        console.log(`${this.make} ${this.model} is silently cruising.`);
        this.currentBatteryLevel -= 10;
    } 
    else 
    {
        console.log(`${this.make} ${this.model}'s engine is not running.`);
    }
    }

    reverse() {
        console.log(`${this.make} ${this.model} is silently reversing.`);
    }
    }


    class GasolineCar extends Car {
    constructor(make, model, fuelType) {
    super(make, model);
    this.fuelType = fuelType;
    this.currentFuelLevel = 50; 
    }

    refuel() {
    console.log(`${this.make} ${this.model}'s tank is being refueled...`);
    this.currentFuelLevel = 100;
    }

    drive() {
    if (this.isEngineRunning) {
    console.log(`${this.make} ${this.model} is roaring down the road.`);
    this.currentFuelLevel -= 5;
    } 
    else 
        {
        console.log(`${this.make} ${this.model}'s engine is not running.`);
        }
    }
    
    reverse() {
        console.log(`${this.make} ${this.model} is reversing with a growl.`);
    }
    }


    function driveCar(car) {
    car.startEngine();
    car.drive();
    car.reverse();
    car.stopEngine();
    }


    const electricCar = new ElectricCar('Tesla', 'Model S', '100 kWh');
    const gasolineCar = new GasolineCar('Toyota', 'Camry', 'Petrol');

    driveCar(electricCar);
    console.log('\n');
    driveCar(gasolineCar);
