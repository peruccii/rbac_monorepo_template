import { createMongoAbility, AbilityBuilder, CreateAbility, MongoAbility } from '@casl/ability';
import {User} from "./models/user.ts";
import {permissions} from "./permissions.ts";
import {UserSubject} from "./subjetcs/user.ts";
import {ProjectSubject} from "./subjetcs/project.ts";
import {OrganizationSubject} from "./subjetcs/organizations.ts";
import {InviteSubject} from "./subjetcs/invite.ts";
import {BillingSubject} from "./subjetcs/billing.ts";

type AppAbilities =  UserSubject | BillingSubject | ProjectSubject | InviteSubject | OrganizationSubject |  ['manage', 'all'];

export type AppAbility = MongoAbility<AppAbilities>;
export const createApsAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User) {
    const builder = new AbilityBuilder(createApsAbility)

    if (typeof permissions[user.role] !== 'function') {
        throw new Error(`Permission for role ${user.role} not found.`)
    }

    permissions[user.role](user, builder)

    const ability = builder.build({
        detectSubjectType(subject) {
            return subject.__typename
        }
    })

    return ability

}