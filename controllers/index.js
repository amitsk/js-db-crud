import models from '../models/index.js';

// Default fields for each model when no records exist
const defaultFields = {
  User: ['id', 'name', 'email'],
  Product: ['id', 'name', 'price', 'description'],
  Order: ['id', 'user_id', 'product_id', 'quantity']
};

export function createCrudController(Model) {
  return {
    async list(req, res) {
      try {
        const items = await Model.findAll();
        const fields = items.length > 0 ? Object.keys(items[0]) : defaultFields[Model.name] || [];
        res.render(`${Model.name.toLowerCase()}s/list`, {
          title: `${Model.name}s`,
          items,
          entity: Model.name.toLowerCase(),
          fields
        });
      } catch (error) {
        req.flash('error', error.message);
        res.redirect('/');
      }
    },

    async show(req, res) {
      try {
        const { id } = req.params;
        const item = await Model.findById(id);
        if (!item) {
          req.flash('error', `${Model.name} not found`);
          return res.redirect(`/${Model.name.toLowerCase()}s`);
        }
        const fields = Object.keys(item);
        res.render(`${Model.name.toLowerCase()}s/show`, {
          title: `View ${Model.name}`,
          item,
          entity: Model.name.toLowerCase(),
          fields
        });
      } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/${Model.name.toLowerCase()}s`);
      }
    },

    async showForm(req, res) {
      try {
        const { id } = req.params;
        let item = null;
        if (id) {
          item = await Model.findById(id);
        }
        let fields = item ? Object.keys(item) : defaultFields[Model.name] || [];
        // Exclude 'id' field from forms
        fields = fields.filter(field => field !== 'id');
        res.render(`${Model.name.toLowerCase()}s/form`, {
          title: id ? `Edit ${Model.name}` : `New ${Model.name}`,
          item,
          entity: Model.name.toLowerCase(),
          fields
        });
      } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/${Model.name.toLowerCase()}s`);
      }
    },

    async create(req, res) {
      try {
        await Model.create(req.body);
        req.flash('success', `${Model.name} created successfully`);
        res.redirect(`/${Model.name.toLowerCase()}s`);
      } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/${Model.name.toLowerCase()}s/new`);
      }
    },

    async update(req, res) {
      try {
        const { id } = req.params;
        await Model.update(id, req.body);
        req.flash('success', `${Model.name} updated successfully`);
        res.redirect(`/${Model.name.toLowerCase()}s`);
      } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/${Model.name.toLowerCase()}s/${id}/edit`);
      }
    },

    async delete(req, res) {
      try {
        const { id } = req.params;
        await Model.delete(id);
        req.flash('success', `${Model.name} deleted successfully`);
        res.redirect(`/${Model.name.toLowerCase()}s`);
      } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/${Model.name.toLowerCase()}s`);
      }
    }
  };
}

export const controllers = {};
for (const [name, Model] of Object.entries(models)) {
  controllers[name.toLowerCase()] = createCrudController(Model);
}