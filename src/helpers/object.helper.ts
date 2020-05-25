export class ObjectHelper {
    static convertToPlainObject<T>(obj): T {
        return JSON.parse(JSON.stringify(obj)) as T;
    }
}