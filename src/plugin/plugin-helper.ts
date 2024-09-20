import { DynamicModule, Type } from '@nestjs/common';
import { PLUGIN_METADATA } from './constants';

export function getEntitiesFromPlugins(plugins?: Array<Type<any> | DynamicModule>): Array<Type<any>> {
  if (!plugins) {
    return [];
  }
  return plugins
    .map((plugin) => reflectMetadata(plugin, PLUGIN_METADATA.ENTITIES))
    .reduce((all, entities) => [...all, ...(entities || [])], []);
}

function reflectMetadata(metatype: Type<any> | DynamicModule, metadataKey: string) {
  return Reflect.getMetadata(metadataKey, isDynamicModule(metatype) ? metatype.module : metatype);
}

export function isDynamicModule(type: Type<any> | DynamicModule): type is DynamicModule {
  return !!(type as DynamicModule).module;
}
