import type { RefObject } from "react";
import {type Group} from 'three'

export type GroupRef = RefObject<Group | null>
export type SetGroup = (node: Group | null) => void