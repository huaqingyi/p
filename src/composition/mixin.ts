export function mixin<T extends Function, W extends Function>(selfed: T, withed: W): T & W {
    Object.keys(withed.prototype).map(name => {
        if (name !== 'constructor') selfed.prototype[name] = withed.prototype[name];
    });
    return selfed as any;
}
