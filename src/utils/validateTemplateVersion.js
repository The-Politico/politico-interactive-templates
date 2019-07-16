import semver from 'semver';
import meta from 'Meta';

export default ({ version }) => version ? semver.satisfies(meta.version, version) : false;
