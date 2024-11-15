/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/env.d.ts" />
/// <reference types="astro/client" />

import type {
  TransitionBeforePreparationEvent,
  TransitionBeforeSwapEvent,
} from 'astro:transitions/client';

declare global {
  namespace App {
    interface Locals {
      isMobile: boolean;
    }
  }

  interface DocumentEventMap {
    'astro:before-preparation': TransitionBeforePreparationEvent;
    'astro:after-preparation': Event;
    'astro:before-swap': TransitionBeforeSwapEvent;
    'astro:after-swap': Event;
    'astro:page-load': Event;
  }

  interface Array<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: T, fromIndex?: number): boolean;
    includes(
      searchElement: unknown,
      fromIndex?: number,
    ): searchElement is T;
  }

  interface Set<T> {
    /**
     * @returns a boolean indicating whether an element with the specified value exists in the Set or not.
     */
    has(value: T): boolean;
    has(value: unknown): value is T;
  }
}
