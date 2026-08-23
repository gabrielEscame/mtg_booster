import type { RefObject } from "react";
import {type Group} from 'three'

export type GroupRef = RefObject<Group | null>
export type SetGroup = (node: Group | null) => void
export type refElement = RefObject<HTMLElement | null>
export type refDiv = RefObject<HTMLDivElement | null>