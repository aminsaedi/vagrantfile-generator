import Handlebars from "handlebars";

Handlebars.registerHelper("or", function (arg1, arg2, arg3, options) {
  if (arg1 || arg2 || arg3) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper("when",function(operand_1, operator, operand_2, options) {
  var operators = {
   'eq': function(l,r) { return l == r; },
   'noteq': function(l,r) { return l != r; },
  }
  , result = operators[operator](operand_1,operand_2);

  if (result) return options.fn(this);
  else  return options.inverse(this);
});

const template = `# Automatically Generated by Vagrant Config Generator, see https://github.com/jianan1104/vagrantfile-generator
Vagrant.configure('2') do |config|
  {{#if count}}
  (1..{{count}}).each do |i|
  config.vm.define "machine-#{i}" do |machine|
    machine.vm.box = '{{box}}'
    {{#if ip}}
    machine.vm.network "private_network", ip: '{{ip}}'
    {{/if}}
    {{#if hostname}}
    {{#when count 'noteq' 1}}
    machine.vm.hostname = "{{hostname}}-#{i}"
    {{/when}}
    {{#when count 'eq' 1}}
    machine.vm.hostname = "{{hostname}}"
    {{/when}}
    {{/if}}
    {{#if synced_folder}}
    {{/if}}
    {{#if provider}}
    machine.vm.provider "{{provider}}" do |vb|
      {{#if name}}
      vb.name = '{{name}}-{{i}}'
      {{/if}}
      {{#if cpus}}
      vb.cpus = '{{cpus}}'
      {{/if}}
      {{#if memory}}
      vb.memory = '{{memory}}'
      {{/if}}
    end
    {{/if}}
  end
  end
  {{/if}}
end
`;

export default template;
