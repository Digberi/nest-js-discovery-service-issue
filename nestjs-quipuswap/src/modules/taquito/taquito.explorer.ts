/* eslint-disable @typescript-eslint/no-magic-numbers */
import { isEmptyArray } from '@common';
import { Injectable } from '@nestjs/common';
import { Controller } from '@nestjs/common/interfaces';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';

import { TEZOS_BLOCK_SUBSCRIPTION } from './constants';
import { TaquitoSubscriberMetadataConfiguration } from './types';

@Injectable()
export class TaquitoExplorer {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  public explore(): Array<TaquitoSubscriberMetadataConfiguration> {
    const providersWrappers = this.getProvidersWrappers();

    const configurations = providersWrappers.map((provider) =>
      this.extractConfiguration(provider),
    );

    if (isEmptyArray(configurations)) {
      return [];
    }

    return configurations.reduce((prev, curr) => {
      return prev.concat(curr);
    });
  }

  private getProvidersWrappers() {
    const providers = this.discoveryService.getProviders();
    const controllers = this.discoveryService.getControllers();

    console.log('providers: ', providers);
    console.log('controllers: ', controllers);

    return [...providers, ...controllers]
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter((wrapper) => wrapper.instance);
  }

  private extractConfiguration({
    instance,
  }): Array<TaquitoSubscriberMetadataConfiguration> {
    const instancePrototype = Object.getPrototypeOf(instance);
    const configuration = this.metadataScanner.scanFromPrototype(
      instance,
      instancePrototype,
      (method) => this.exploreMethodMetadata(instancePrototype, method),
    );

    return configuration.map((configuration) => {
      const func = configuration.callback.bind(instance);

      return {
        ...configuration,
        callback: func,
      };
    });
  }

  private exploreMethodMetadata(
    instancePrototype: Controller,
    methodKey: string,
  ): TaquitoSubscriberMetadataConfiguration {
    const targetCallback = instancePrototype[methodKey];
    const handler = Reflect.getMetadata(
      TEZOS_BLOCK_SUBSCRIPTION,
      targetCallback,
    );
    if (handler == null) {
      return null;
    }
    return handler;
  }
}
