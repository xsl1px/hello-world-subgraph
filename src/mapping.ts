import { BigInt } from "@graphprotocol/graph-ts"
import {
  drgn,
  OwnershipTransferred,
  Approval,
  Transfer
} from "../generated/drgn/drgn"
import { OwnershipTransferred, Approval, Transfer } from "../generated/schema"

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = OwnershipTransferred.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new OwnershipTransferred(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.name(...)
  // - contract.approve(...)
  // - contract.totalSupply(...)
  // - contract.transferFrom(...)
  // - contract.INITIAL_SUPPLY(...)
  // - contract.decimals(...)
  // - contract.decreaseApproval(...)
  // - contract.balanceOf(...)
  // - contract.owner(...)
  // - contract.symbol(...)
  // - contract.transfer(...)
  // - contract.anailNathrachOrthaBhaisIsBeathaDoChealDeanaimh(...)
  // - contract.increaseApproval(...)
  // - contract.allowance(...)
}

export function handleApproval(event: Approval): void {
  let entity = Approval.load(event.params.owner.toHex())

  if (entity == null) {
    entity = new Approval(event.params.owner.toHex())
    entity.count = BigInt.fromI32(0)  
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handleTransfer(event: Transfer): void {
  let entity = Transfer.load(event.params.from.toHex())

  if (entity == null) {
    entity = new Transfer(event.params.from.toHex())
    entity.count = BigInt.fromI32(0)  
  }

  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}
